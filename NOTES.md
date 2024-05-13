# DATABASE

-   Collections
    -   users
        -   `fullName`
        -   `email`
        -   `wishlist`
        -   `cart`
        -   `orders`
            -   `_id`
    -   categories
        -   `_id`
        -   `title`
        -   `description`
    -   products
    -   orders

# LOGICS

-   Wishlist
    -   get the user
    -   get the product
    -   add the product to the user collection wishlist
    -   maybe item count changed from the quantity
    -   need to add the time also, so that after a certain time the can be removed from the wishlist if the user does not wish to buy
