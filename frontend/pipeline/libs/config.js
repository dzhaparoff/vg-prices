'use strict';

import path  from 'path'
import yaml  from 'js-yaml'
import fs    from 'fs'
import yargs from 'yargs'
import { _ }   from 'lodash'

const CONFIG_YML = './pipeline/config.yml';

class Config {
  constructor() {
    let config = Config.load_config(CONFIG_YML);

    this.src            = path.resolve(config.root.src);
    this.dest           = path.resolve(config.root.dest);
    this.compitability  = config.compitability;
    this.raw            = config;

    this._env = yargs.argv.env;

    _.each(
        config.tasks,
        (task, taskname) => {
          this[taskname] = _.reduce(
              task,
              (t, val, part) => {
                switch(part){
                  case 'src'     : t[part] = path.join(this.src,  val);  break;
                  case 'dest'    : t[part] = path.join(this.dest, val); break;
                  case 'config'  : t[part] = path.resolve(val); break;
                  case 'include' : t[part] = Config.resolve_include_array(val); break;
                  default        : t[part] = val
                }
                return t
              },
              {}
          )
        }
    )
  }
  get env() {
    return this._env;
  }
  get is_production() {
    return this._env == 'production';
  }
  get is_development() {
    return this._env == 'development';
  }
  static load_config(conf) {
    return yaml
        .load(
            fs.readFileSync(conf, 'utf8')
        );
  }
  static resolve_include_array(array){
    return _.map(array, item => path.resolve(item))
  }
}

export const config = new Config;
export const config_file = config.raw;
