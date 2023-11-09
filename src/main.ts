import Phaser from 'phaser';
import bgImg from './assets/background.png';
import playerImg from './assets/player.png';

class MyGame extends Phaser.Scene {
	background?: Phaser.GameObjects.Image;
	player?: Phaser.GameObjects.Sprite;
	keyboardInput?: Phaser.Types.Input.Keyboard.CursorKeys;
	constructor() {
		super();
	}

	preload() {
		this.load.image('background1', bgImg);

		this.load.spritesheet('player', playerImg, {
			frameWidth: 32,
			frameHeight: 36,
		});
	}

	create() {
		this.background = this.add.image(0, 0, 'background1');
		this.background.setOrigin(0, 0);

		this.player = this.add.sprite(config.width / 2, config.height / 2, 'player');
		this.anims.create({
			key: 'player_anim',
			frames: this.anims.generateFrameNumbers('player'),
			frameRate: 12,
			repeat: -1,
		});

		this.anims.create({
			key: 'player_idle',
			frames: this.anims.generateFrameNumbers('player', {
				start: 0,
				end: 0,
			}),
			frameRate: 1,
			repeat: 0,
		});

		this.add.text(10, 10, `70분의 1 xxx뽑기에 오신 것을 환영합니다.`, {
			font: '25px 배달의민족 주아 OTF',
			color: '#f5e99f',
		});

		this.player.play('player_anim');
		this.keyboardInput = this.input.keyboard?.createCursorKeys();
		this.player.setData('m_moving', false);
	}

	update() {
		this.move(this.player as Phaser.GameObjects.Sprite);
	}

	move(player: Phaser.GameObjects.Sprite) {
		const PLAYER_SPEED = 0.2;

		if (
			this.keyboardInput?.left.isDown ||
			this.keyboardInput?.right.isDown ||
			this.keyboardInput?.up.isDown ||
			this.keyboardInput?.down.isDown
		) {
			console.log('press');
			if (!player.getData('m_moving')) {
				player.play('player_anim');
			}
			player.setData({ m_moving: true });
		} else {
			if (player.getData('m_moving')) {
				player.play('player_idle');
			}
			player.setData({ m_moving: false });
		}

		if (this.keyboardInput?.left.isDown) {
			player.x -= PLAYER_SPEED;
			player.flipX = false;
		} else if (this.keyboardInput?.right.isDown) {
			player.x += PLAYER_SPEED;
			player.flipX = true;
		}

		if (this.keyboardInput?.up.isDown) {
			player.y -= PLAYER_SPEED;
		} else if (this.keyboardInput?.down.isDown) {
			player.y += PLAYER_SPEED;
		}
	}
}

const config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	backgroundColor: 0x000000,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
		},
	},
	scene: MyGame,
};

const game = new Phaser.Game(config);
