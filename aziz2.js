function gameLoop() {
    if (checkCollision()) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
    placeFood(1000); // Ovqatni har safar joylashtirish
    setTimeout(gameLoop, 200);
}
