

// --- Món ăn ở gần bạn
$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:8080/api/foods',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response && response.length > 0) {
                var offersList = $('.offers-list');
                offersList.empty();

                $.each(response.slice(0, 9), function(index, food) {  // ✅ Lấy đúng 9 món ăn
                    var link = $('<a class="link-infor" href="../food/food.html?id=' + food.id + '">');
                    var offerItem = $('<div class="offer-item">');
                    var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                    var content = $('<div class="offer-item-content">');
                    var promoText = food.specialOffer ? "Special Offer" : (food.featured ? "Featured" : "Ưu đãi");
                    var promo = $('<div class="offer-item-promo">').text(promoText);
                    var name = $('<div class="offer-item-name">').text(food.name);

                    var priceContainer = $('<div class="offer-item-price">');
                    var originalPrice = $('<span class="offer-item-original-price">');
                    var discountPrice = $('<span class="offer-item-discount-price">');
                    var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");

                    addToCartButton.data('food-id', food.id);
                    addToCartButton.data('food-name', food.name);
                    addToCartButton.data('food-price', food.price);

                    if (food.discountPrice && food.discountPrice < food.price) {
                        originalPrice.text(formatCurrency(food.price));
                        originalPrice.css('text-decoration', 'line-through');
                        discountPrice.text(formatCurrency(food.discountPrice));
                        priceContainer.append(discountPrice, originalPrice, addToCartButton);
                    } else {
                        discountPrice.text(formatCurrency(food.price));
                        priceContainer.append(discountPrice, addToCartButton);
                    }

                    content.append(promo, name, priceContainer);
                    offerItem.append(image, content);
                    link.append(offerItem);
                    offersList.append(link);
                });
            } else {
                $('.offers-list').html('<div class="offer-item">Không có ưu đãi nào.</div>');
            }
        },
        error: function(xhr, status, error) {
            $('.offers-list').html('<div class="offer-item">Lỗi tải ưu đãi. Vui lòng thử lại sau.</div>');
            console.error('Lỗi khi tải ưu đãi:', error);
        }
    });

    // --- Món ưu đãi
    


    // --- Món giao nhanh
    $.ajax({
        url: 'http://localhost:8080/api/foods/fast-delivery',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var fastDeliveryList = $('.fast-delivery-list');
            fastDeliveryList.empty();

            if (response && response.length > 0) {
                $.each(response.slice(0, 6), function(index, food) {
                    var link = $('<a class="link-infor" href="food.html?id=' + food.id + '">'); // ✅ Chuyển đến food.html khi click
                    var offerItem = $('<div class="offer-item fast-delivery-item">');
                    var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                    var content = $('<div class="offer-item-content">');
                    var promo = $('<div class="offer-item-promo">').text("Giao nhanh");
                    var name = $('<div class="offer-item-name">').text(food.name);
                    var prepTime = $('<div class="offer-item-prep-time">').text(`⏳ ${food.preparationTime} phút`);

                    var priceContainer = $('<div class="offer-item-price">');
                    var discountPrice = $('<span class="offer-item-discount-price">').text(formatCurrency(food.price));
                    var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");

                    addToCartButton.data('food-id', food.id);
                    addToCartButton.data('food-name', food.name);
                    addToCartButton.data('food-price', food.price);

                    priceContainer.append(discountPrice, addToCartButton);
                    content.append(promo, name, prepTime, priceContainer);
                    offerItem.append(image, content);
                    link.append(offerItem);
                    fastDeliveryList.append(link);
                });
            } else {
                fastDeliveryList.html('<div class="offer-item">Không có món ăn giao nhanh nào.</div>');
            }
        },
        error: function(xhr, status, error) {
            $('.fast-delivery-list').html('<div class="offer-item">Lỗi tải món ăn giao nhanh. Vui lòng thử lại sau.</div>');
        }
    });


/// ----- Giao nhanh
    $(document).ready(function () {
        console.log("📢 Homepage loaded!");

        // 🚀 Gọi cả hai API song song để đảm bảo tải xong mới hiển thị
        Promise.all([loadFastDeliveryFoods(), loadMostViewedFoods()])
            .then(() => console.log("✅ Tất cả dữ liệu đã tải xong"))
            .catch(error => console.error("❌ Lỗi khi tải dữ liệu:", error));
    });

// 🛠️ Hàm tải danh sách món ăn giao nhanh
    function loadFastDeliveryFoods() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'http://localhost:8080/api/foods/fast-delivery',
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    var fastDeliveryList = $('.fast-delivery-list');
                    fastDeliveryList.empty();

                    console.log("🚀 Dữ liệu món ăn giao nhanh:", response);

                    if (response && response.length > 0) {
                        $.each(response.slice(0, 6), function(index, food) {
                            var link = $('<a class="link-infor" href="../food/food.html?id=' + food.id + '">'); // ✅ Sửa lại đường dẫn
                            var offerItem = $('<div class="offer-item fast-delivery-item">');
                            var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                            var content = $('<div class="offer-item-content">');
                            var promo = $('<div class="offer-item-promo">').text("Giao nhanh");
                            var name = $('<div class="offer-item-name">').text(food.name);
                            var prepTime = $('<div class="offer-item-prep-time">').text(`⏳ ${food.preparationTime} phút`);

                            var priceContainer = $('<div class="offer-item-price">');
                            var discountPrice = $('<span class="offer-item-discount-price">').text(formatCurrency(food.price));
                            var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");

                            addToCartButton.data('food-id', food.id);
                            addToCartButton.data('food-name', food.name);
                            addToCartButton.data('food-price', food.price);

                            priceContainer.append(discountPrice, addToCartButton);
                            content.append(promo, name, prepTime, priceContainer);
                            offerItem.append(image, content);
                            link.append(offerItem);
                            fastDeliveryList.append(link);
                        });
                    } else {
                        fastDeliveryList.html('<div class="offer-item">Không có món ăn giao nhanh nào.</div>');
                    }
                    resolve();
                },
                error: function(xhr, status, error) {
                    $('.fast-delivery-list').html('<div class="offer-item">Lỗi tải món ăn giao nhanh. Vui lòng thử lại sau.</div>');
                    console.error('❌ Lỗi khi tải món ăn giao nhanh:', error);
                    reject(error);
                }
            });
        });
    }


// 🛠️ Hàm tải danh sách món ăn được quan tâm nhất
    function loadMostViewedFoods() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'http://localhost:8080/api/foods/most-viewed',
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    var mostViewedList = $('.most-viewed-list');
                    mostViewedList.empty();

                    console.log("🚀 Dữ liệu món ăn quan tâm nhất:", response);

                    if (response && response.length > 0) {
                        $.each(response.slice(0, 6), function(index, food) {
                            var link = $('<a class="link-infor" href="../food/food.html?id=' + food.id + '">'); // ✅ Sửa lại đường dẫn
                            var offerItem = $('<div class="offer-item most-viewed-item">');
                            var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                            var content = $('<div class="offer-item-content">');
                            var promo = $('<div class="offer-item-promo">').text("Quan tâm nhiều nhất");
                            var name = $('<div class="offer-item-name">').text(food.name);
                            var viewCount = $('<div class="offer-item-views">').text(`👁️ ${food.views} lượt xem`);

                            var priceContainer = $('<div class="offer-item-price">');
                            var discountPrice = $('<span class="offer-item-discount-price">').text(formatCurrency(food.price));
                            var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");

                            addToCartButton.data('food-id', food.id);
                            addToCartButton.data('food-name', food.name);
                            addToCartButton.data('food-price', food.price);

                            priceContainer.append(discountPrice, addToCartButton);
                            content.append(promo, name, viewCount, priceContainer);
                            offerItem.append(image, content);
                            link.append(offerItem);
                            mostViewedList.append(link);
                        });
                    } else {
                        mostViewedList.html('<div class="offer-item">Không có món ăn được quan tâm nào.</div>');
                    }
                    resolve();
                },
                error: function(xhr, status, error) {
                    $('.most-viewed-list').html('<div class="offer-item">Lỗi tải món ăn được quan tâm. Vui lòng thử lại sau.</div>');
                    console.error('❌ Lỗi khi tải món ăn được quan tâm:', error);
                    reject(error);
                }
            });
        });
    }


    // --- Giỏ hàng
    var cart = JSON.parse(localStorage.getItem('sffood-cart')) || [];

    $(document).on('click', '.offer-item-add-cart-button', function(event) {
        if ($('#logout-button').length) {
            var foodId = $(this).data('food-id');
            var foodName = $(this).data('food-name');
            var foodPrice = $(this).data('food-price');

            var existingItemIndex = cart.findIndex(item => item.id === foodId);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({ id: foodId, name: foodName, price: foodPrice, quantity: 1 });
            }

            localStorage.setItem('sffood-cart', JSON.stringify(cart));
            alert("Đã thêm '" + foodName + "' vào giỏ hàng!");
        } else {
            event.preventDefault();
            window.location.href = "../sign-in/sign-in.html";
        }
    });

    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
});
