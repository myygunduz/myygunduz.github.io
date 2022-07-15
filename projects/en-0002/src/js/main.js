const { createApp } = Vue;


createApp({
    data() {
        return {
            users: {
                player: {
                    name: 'Player',
                    health: 100,
                    img: 'https://shiftdelete.net/wp-content/uploads/2022/05/the-witcher-3-wild-hunt-cikis-tarihi-1.jpg',
                },
                monster: {
                    name: 'Monster',
                    health: 100,
                    img: 'https://i.pinimg.com/originals/87/86/f2/8786f2341a0c8108a91b6c2665d73790.png',
                }
            },
            gameLog: [],
            gameOver: true,
            winner :''
        }
    },
    methods: {
        startGame() {
            this.gameOver = false;
            this.users.player.health = 100;
            this.users.monster.health = 100;
            this.gameLog = [];
            this.winner = '';
        },
        attack(){
            var player = this.users.player;
            var monster = this.users.monster;
            var damage = this.getDamage();
            monster.health -= damage;
            if(monster.health <= 0){
                this.winner = player.name;
                this.gameLog.splice(0, 0,[
                    'player',
                    `<i class="fa-solid fa-skull"></i> <b>${monster.name}</b> is dead`,
                    '--color:#FF8C32;--color-transparent:#FF8C3220;']);
                monster.health = 0;
                setTimeout(this.finishGame, 100);
                return;
            }else{
                this.gameLog.splice(0, 0,[
                    'player',
                    `<i class="fa-solid fa-gun"></i> ${player.name} attacked ${monster.name} for <b>${damage}</b> damage`,
                    '--color:#3AB4F2;--color-transparent:#3AB4F220;']);
            }
            damage = this.getDamage();
            player.health -= damage;
            if(player.health <= 0){
                this.winner = monster.name;
                this.gameLog.splice(0, 0,[
                    'player',
                    `<i class="fa-solid fa-skull"></i> <b>${player.name}</b> died`,
                    '--color:#FF8C32;--color-transparent:#FF8C3220;']);
                player.health = 0;
                setTimeout(this.finishGame, 100);
            }else{
                this.gameLog.splice(0, 0,[
                    'monster', 
                    `<i class="fa-solid fa-gun"></i> ${monster.name} attacked ${player.name} for <b>${damage}</b> damage`,
                    '--color:#DA0037;--color-transparent:#DA003720;']);
            }
        },
        getDamage(){
            return Math.floor(Math.random() * 10) + 1;
        },
        heal(){
            var player = this.users.player;
            var monster = this.users.monster;
            var heal = this.getDamage(player);
            player.health += heal;
            this.gameLog.splice(0, 0,[
                'player',
                `<i class="fa-solid fa-hand-holding-medical"></i> ${player.name} healed for <b>${heal}</b>`,
                '--color:#A7D129;--color-transparent:#A7D12920;']);
            
            var damage = this.getDamage();
            player.health -= damage;
            this.gameLog.splice(0, 0,[
                'monster', 
                `<i class="fa-solid fa-gun"></i> ${monster.name} attacked ${player.name} for <b>${damage}</b> damage`,
                '--color:#DA0037;--color-transparent:#DA003720;']);

            if(player.health <= 0){
                this.winner = monster.name;
                this.gameOver = true;
                this.gameLog.splice(0, 0,[
                    'player',
                    `<i class="fa-solid fa-skull"></i> <b>${player.name}</b> died`,
                    '--color:#FF8C32;--color-transparent:#FF8C3220;']);
                player.health = 0;
                setTimeout(this.finishGame(), 100);
            }
        },
        giveUp(){
            this.gameLog.splice(0, 0,[
                'player',
                `<i class="fa-solid fa-skull"></i> <b>${this.users.player.name}</b> gave up`,
                '--color:#FF8C32;--color-transparent:#FF8C3220;']);
            
            setTimeout(this.finishGame, 100);
        },
        finishGame(){
            this.gameOver = true;
            if (confirm('Are you want to play again?')) {
                this.startGame();
            } else {
                this.mainData.gameOver = true;
                this.mainData.gameLog = [];    
            }
        }
    },
    computed: {
        showLog(){
            return this.gameLog.length > 0;
        }
    }
}).mount('#app');
