require "poodr"

RSpec.describe Poodr do
  it "has a version number" do
    expect(Poodr::VERSION).not_to be nil
  end

  it "can calculate gear ratios from Gear class" do
    expect(Poodr::Gear.new(52, 11).ratio).to eql(4.7272727272727275)
  end

  it "can calculate gear ratios from Gear2 class" do
    expect(Poodr::Gear2.new(52, 11).ratio).to eql(4.7272727272727275)
  end

  it "can calculate wheel circumference from Wheel class" do
    circumference = Poodr::Wheel.new(26, 1.5).circumference
    expect(circumference).to eql(91.106186954104)
  end

  it "can calculate gear inches from Gear2 class" do
    wheel = Poodr::Wheel.new(26, 1.5)
    gear_inches = Poodr::Gear2.new(52, 11, wheel).gear_inches
    expect(gear_inches).to eql(137.0909090909091)
  end
end
