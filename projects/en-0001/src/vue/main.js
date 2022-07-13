const {createApp} = Vue;


createApp({
    data(){
        return{
            title:'Calculator v1.0',
            operation: '',
            result: '0',
            theme: 'green',
            darkOrLight: 'dark',
            themeActive: false,
            buttons:[
                {name:'C', shortCut: 'Escape'},
                {name:'CE', shortCut: 'Backspace'},
                {name:'+/-', shortCut: 'Shift'},
                {name:'%', shortCut: '%'},
                {name:'7', shortCut: '7'},
                {name:'8', shortCut: '8'},
                {name:'9', shortCut: '9'},
                {name:'÷', shortCut: '/'},
                {name:'4', shortCut: '4'},
                {name:'5', shortCut: '5'},
                {name:'6', shortCut: '6'},
                {name:'x', shortCut: '*'},
                {name:'1', shortCut: '1'},
                {name:'2', shortCut: '2'},
                {name:'3', shortCut: '3'},
                {name:'-', shortCut: '-'},
                {name:'0', shortCut: '0'},
                {name:',', shortCut: ','},
                {name:'=', shortCut: 'Enter'},
                {name:'+', shortCut: '+'}
            ],
            social_medias:[
                {
                    name:'Github',  
                    url:'https://www.github.com/myygunduz/',
                    icon:'<i class="fa-brands fa-github"></i>'
                },
                {
                    name:'Twitter',
                    url:'https://twitter.com/myygunduz/',
                    icon:'<i class="fa-brands fa-twitter"></i>'
                },
                {
                    name:'Instagram',
                    url:'https://www.instagram.com/myygunduz/',
                    icon:'<i class="fa-brands fa-instagram"></i>'
                },
                {
                    name:'Youtube',
                    url:'https://www.youtube.com/channel/UCQGiz8XLyoBDmLRNtZt8xBQ',
                    icon:'<i class="fa-brands fa-youtube"></i>'
                },
                {
                    name:'LinkedIn',
                    url:'https://www.linkedin.com/in/myygunduz/',
                    icon:'<i class="fa-brands fa-linkedin"></i>'
                },
                {   name:'Source Code',
                    url:'https://github.com/myygunduz/Calculator',
                    icon:'<i class="fa-solid fa-code"></i>'
                }
            ],
            themes:{
                red:'#D82148',
                blue:'#00A2FF',
                green:'#41B883',
                yellow:'#FFCD00',
                orange:'#FF9100',
                purple:'#9C27B0',
                pink:'#E91E63',
                brown:'#795548',
            }
        }
    },
    methods:{
        clickButton(button){
            switch(button){
                case 'C':
                    this.clear();
                    break;
                case 'CE':
                    this.delete();
                    break;
                case '=':
                    this.calculate();
                    break;
                case '+/-':
                    this.revaluation();  
                    break;
                case '%':
                    this.percentage();
                    break;
                case '+': case '-': case 'x': case '÷':
                    this.addOperation(button);
                    break; 
                default:
                    this.addNumber(button);
            }
        },
        clear(){
            this.result = '0';
            this.operation = '';
        },
        delete(){
            this.result = this.result.slice(0, -1);
            if(this.result === ''){
                this.result = '0';
                this.operation = '';
            }
        },
        calculate(){
            if (this.result == "Error"){
                this.result = "Error";
                this.operation = "";
                return;
            }
            this.result = this.result.replace('÷', '/');
            this.result = this.result.replace('x', '*');
            this.result = this.result.replace(',', '.');

            try{
                let result = eval(this.result);
            }
            catch(e){
                this.result = 'Error';
                return;
            }
            let result = eval(this.result);
            this.result = this.result.replace('*', 'x');
            this.result = this.result.replace('/', '÷');
            this.result = this.result.replace('.', ',');

            this.operation = this.result + '=';
            this.result = result.toString().replace('.', ',');
            if (this.result === 'NaN'){
                this.result = 'Error';
                this.operation = '';
            }
        },
        revaluation(){
            if(this.result === '0'){
                return;
            }
            var control=true;
            for (let i = this.result.length - 1; i >= 0; i--) {
                // this.result split use operations
                if (this.result[i]=="+" || this.result[i]=="-" || this.result[i]=="x" || this.result[i]=="÷"){
                    if (this.result[i]=="+"){
                        this.result = this.result.slice(0, i) + "-"+ this.result.slice(i+1);
                        control=false;
                        return 
                    }
                    else if (this.result[i]=="-"){
                        this.result = this.result.slice(0, i) + "+"+ this.result.slice(i+1);
                        control=false;
                        return
                    } else{
                        control=false;
                        return
                    }
                }

            }   
            if (control){
                this.result = "-"+this.result;
            }
        },
        percentage(){
            this.result = this.result +'÷100';
        },
        addNumber(button){
            if(this.result === '0'){
                this.result = button;
            }
            else{
                if (button==','){
                    if(this.checkDot()){
                        this.result += button;
                    }
                }else{
                    this.result += button;

                }
            }
        },
        addOperation(operation){
            let result = this.result;
            let result_last = result.charAt(result.length - 1);
            if(result_last == '+' || result_last == '-' || result_last == 'x' || result_last == '÷'){
                this.result = result.slice(0, -1);
            }
            this.result += operation;
        },
        getLastElement(){
            for (let i = this.result.length - 1; i >= 0; i--) {
                // this.result split use operations
                if (this.result[i]=="+" || this.result[i]=="-" || this.result[i]=="x" || this.result[i]=="÷"){
                    var split_text = this.result.split(this.result[i]);
                    return split_text;
                }
            }    
            return this.result;        

        },
        checkDot(){
            var lastElement = this.getLastElement();
            return lastElement[lastElement.length-1].includes(',') ? false : true;
        },
        //theme functoins

        changeTheme(){
            if(this.darkOrLight === 'dark'){
                this.darkOrLight = 'light';
            }
            else{
                this.darkOrLight = 'dark';
            }
        },
        changeColor(color){
            var app = document.getElementById('app');
            var elements_to_change=[
                '--calculator-border-color',
                '--operation-text-color',
                '--operation-text-color-transparent',
                '--button-border-color',
                '--button-border-color-hover',
                '--button-text-color',
                '--button-background-color-hover',
                '--theme-text-color',
                '--theme-border-color',
                '--social-media-color',
                '--title-color'
            ]
            for(let i = 0; i < elements_to_change.length; i++){
                app.style.setProperty(elements_to_change[i], color);
            }
        }
    },
    mounted() {
        // press escape to clear the result
        window.addEventListener("keydown", function(e) {
            for (let i = 0; i < this.buttons.length; i++) {
                if (e.key === this.buttons[i].shortCut) {
                    this.clickButton(this.buttons[i].name);
                }
            }
        }.bind(this));
        window.addEventListener("load", function(e) {
            this.changeColor(this.themes.green);
        }.bind(this));
    }
}).mount('#themplate');

