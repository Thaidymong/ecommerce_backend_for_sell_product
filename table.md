# customer  table
    customer_id PK 
    firstname 
    lastname 
    gender
    username
    password 
    create_at
#address 
    address_id
    customer_id 
    province_id
    firstname
    lastname
    tel
    email
    address_description
    create_at 
#province 
    province_id PK 
    name 
    code 
    create_at
#category
    category_id PK //CategoryID, categoryId
    name 
    description
    image
    create_at

#product
    product_id PK 
    category_id FK 
    name 
    price
    qauntity,
    description,
    image
    status
    create_at

#product_image
    product_image_id PK 
    product_id FK
    image 
    create_at 

#cart 
    cart_id PK 
    customer_id FK 
    product_id FK 
    quantity 
    create_at 

#order 
    order_id PK 
    customer_id FK 

    firstname
    lastname 
    tel 
    email 
    address
    comment

    total_order 

    payment_method 
    order_status
    create_at 

#order_product
    order_product_id PK 
    order_id FK 
    name 
    price 
    qauntity
    total 


# payment_method 
    payment_method_id
    name 
    code 
    status
    sort_order 
    create_at

    ABA, Wing....
# order_status
    order_status_id
    name 
    code 
    status
    create_at

    Pennding, Dilivery, Cancel, Completed.....