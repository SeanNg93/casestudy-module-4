$(document).ready(function() {
    var userName = localStorage.getItem('userName');

    if (userName) {
        $(".hero-greeting").text("Chào " + userName);
    } else {
        $(".hero-greeting").text("Hôm nay ăn gì");
        console.warn("Không tìm thấy tên người dùng trong localStorage.");
    }

    $("#logout-button").click(function() {
        $.ajax({
            url: 'http://localhost:8080/api/auth/signout',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                console.log("Logout successful:", response);
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                window.location.href = "./home-page.html";
            },
            error: function(xhr, status, error) {
                console.error("Logout error:", error);
                alert("Logout failed. Please try again.");
            }
        });
    });

    // --- Món giao nhanh
    loadFastDeliveryFoods();

    // --- Món ăn được quan tâm nhất
    loadMostViewedFoods();
});

// 🛠️ Hàm tải danh sách món ăn giao nhanh
function loadFastDeliveryFoods() {
    $.ajax({
        url: 'http://localhost:8080/api/foods/fast-delivery',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var fastDeliveryList = $('.fast-delivery-list');
            fastDeliveryList.empty();

            if (response && response.length > 0) {
                $.each(response.slice(0, 6), function(index, food) { // ✅ Chỉ hiển thị 6 món
                    var link = $('<a class="link-infor" href="food.html?id=' + food.id + '">'); // ✅ Chuyển đến trang chi tiết món ăn
                    var offerItem = $('<div class="offer-item fast-delivery-item">');
                    var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                    var content = $('<div class="offer-item-content">');
                    var promo = $('<div class="offer-item-promo">').text("Giao nhanh");
                    var name = $('<div class="offer-item-name">').text(food.name);

                    // 🕒 Hiển thị thời gian chuẩn bị món ăn (phút)
                    var preparationTime = $('<div class="offer-item-time">')
                        .text(`⏱ ${food.preparationTime} phút`);

                    var priceContainer = $('<div class="offer-item-price">');
                    var discountPrice = $('<span class="offer-item-discount-price">').text(formatCurrency(food.price));
                    var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");

                    addToCartButton.data('food-id', food.id);
                    addToCartButton.data('food-name', food.name);
                    addToCartButton.data('food-price', food.price);

                    priceContainer.append(discountPrice, addToCartButton);
                    content.append(promo, name, preparationTime, priceContainer); // ✅ Thêm thời gian vào content
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
            console.error('Lỗi khi tải món ăn giao nhanh:', error);
        }
    });
}

// 🛠️ Hàm tải danh sách món ăn được quan tâm nhiều nhất
function loadMostViewedFoods() {
    $.ajax({
        url: 'http://localhost:8080/api/foods/most-viewed',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var mostViewedList = $('.most-viewed-list');
            mostViewedList.empty(); // Xóa dữ liệu cũ trước khi thêm mới

            if (response && response.length > 0) {
                $.each(response.slice(0, 6), function(index, food) { // ✅ Chỉ hiển thị 6 món
                    var link = $('<a class="link-infor" href="food.html?id=' + food.id + '">'); // ✅ Chuyển đến trang chi tiết món ăn
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
        },
        error: function(xhr, status, error) {
            $('.most-viewed-list').html('<div class="offer-item">Lỗi tải món ăn được quan tâm. Vui lòng thử lại sau.</div>');
        }
    });
}

// 🛠️ Hàm format giá tiền
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
