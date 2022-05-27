input.onButtonPressed(Button.A, function () {
    me.change(LedSpriteProperty.X, -1)
    shoot.set(LedSpriteProperty.X, me.get(LedSpriteProperty.X))
})
input.onButtonPressed(Button.AB, function () {
    if (shoot.get(LedSpriteProperty.Y) == 4) {
        shoot.set(LedSpriteProperty.Y, 3)
    }
})
input.onButtonPressed(Button.B, function () {
    me.change(LedSpriteProperty.X, 1)
    shoot.set(LedSpriteProperty.X, me.get(LedSpriteProperty.X))
})
let shoot: game.LedSprite = null
let me: game.LedSprite = null
basic.showString("3")
basic.pause(500)
basic.showString("2")
basic.pause(500)
basic.showString("1")
let enemy = game.createSprite(1, 0)
let bomb = game.createSprite(1, 0)
me = game.createSprite(3, 4)
shoot = game.createSprite(3, 4)
let enemyVelo = 1
music.setVolume(255)
basic.forever(function () {
    if (shoot.get(LedSpriteProperty.Y) <= 0) {
        shoot.set(LedSpriteProperty.Y, 4)
    }
    if (shoot.get(LedSpriteProperty.Y) < 4) {
        shoot.change(LedSpriteProperty.Y, -1)
    }
    basic.pause(100)
})
basic.forever(function () {
    if (shoot.isTouching(enemy)) {
        game.addScore(1)
        enemy.set(LedSpriteProperty.X, randint(0, 4))
        bomb.set(LedSpriteProperty.X, enemy.get(LedSpriteProperty.X))
        bomb.set(LedSpriteProperty.Y, 0)
        music.playTone(523, music.beat(BeatFraction.Quarter))
        basic.pause(100)
    }
})
basic.forever(function () {
    if (bomb.get(LedSpriteProperty.Y) == 4) {
        bomb.set(LedSpriteProperty.Y, 0)
    }
    if (bomb.get(LedSpriteProperty.Y) > 0) {
        bomb.change(LedSpriteProperty.Y, 1)
    }
    if (bomb.get(LedSpriteProperty.Y) == 0) {
        if (randint(0, 10) <= 1 || bomb.get(LedSpriteProperty.X) == me.get(LedSpriteProperty.X)) {
            bomb.set(LedSpriteProperty.X, enemy.get(LedSpriteProperty.X))
            bomb.set(LedSpriteProperty.Y, 1)
        }
    }
    if (bomb.isTouching(me)) {
        music.playTone(523, music.beat(BeatFraction.Quarter))
        music.playTone(262, music.beat(BeatFraction.Quarter))
        game.gameOver()
        basic.pause(100)
    }
    basic.pause(300)
})
basic.forever(function () {
    enemy.change(LedSpriteProperty.X, randint(-1, 1))
    if (bomb.get(LedSpriteProperty.Y) == 0) {
        bomb.set(LedSpriteProperty.X, enemy.get(LedSpriteProperty.X))
    }
    basic.pause(300)
})
