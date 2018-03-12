100.times do
  Product.create(
    name: Faker::Food.product_name,
    description: Faker::Food.sentence,
    price: Faker::Food.price.to_f,
  )
end
