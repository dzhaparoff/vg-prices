module Currency
  class Currency
    include Singleton
    attr_reader :abbreviation
    attr_reader :abbreviations

    def self.rate= val
      self.instance.rate = val
    end

    def self.rate
      self.instance.rate
    end
  end

  class Ruble < Currency
    def initialize
      @abbreviation = "RUR"
      @abbreviations = ["RUR", "RUB", "руб", "р"]
    end
  end

  class Dollar < Currency
    def initialize
      @abbreviation = "USD"
      @abbreviations = ["USD", "$"]
    end
  end

  class Euro < Currency
    def initialize
      @abbreviation = "EUR"
      @abbreviations = ["EUR", "€"]
    end
  end
end
