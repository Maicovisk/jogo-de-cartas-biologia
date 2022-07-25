const app = new Vue({
    el: "#app",
    mounted: function () {
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, {
            duration: 400
        });

        this.help()
        var instance = M.Carousel.getInstance(elems[0]);
        setInterval(() => {
            instance.next()
        }, 10 * 1000);

        this.crazy()
    },

    data: {
        game_data: [
            {
                quest: 'Síndrome de Down',
                resp: 'Trissomia do cromossomo 21',
                help: 'Normalmente, essa síndrome ocorre nos bebês das gestantes acima de 40 anos de idade'
            },
            {
                quest: 'Síndrome de Klinefelter',
                resp: 'Cópia extra do cromossomo X',
                help: 'é uma condição genética bem rara que só afeta homens'
            },
            {
                quest: 'Síndrome de Turner',
                resp: 'Mulher nasce com apenas um cromossomo X',
                help: 'Ela é uma condição genética que só ocorre em mulheres '
            },
            {
                quest: 'Anemia falciforme',
                resp: 'Hemoglobina em níveis abaixo do normal',
                resp_info: 'A hemoglobina é um dos principais componentes do sangue, é responsável pela coloração avermelhada e pelo transporte da molécula de oxigênio',
                help: 'faz com as hemácias produzidas tenham formato de foice'
            },
            {
                quest: 'Doença de Huntington',
                resp: 'Rompimento das células nervosas cerebrais',
                help: 'Sua principal característica é a degeneração progressiva dos neurônios e células do sistema nervoso central'
            },
            {
                quest: 'Fibrose cística',
                resp: 'alteração no gene CFTR',
                help: 'causa acúmulo de muco no trato respiratório, produzindo inflamações e infecções que podem destruir o tecido pulmonar e outros.'
            },
            {
                quest: 'Síndrome de Patau',
                resp: 'trissomia do cromossomo 13',
                help: 'provoca deficiência mental grave e defeitos físicos'
            },
            {
                quest: 'Síndrome de Edwards',
                resp: 'trissomia do cromossomo 18',
                help: 'Os sintomas incluem baixo peso ao nascer, cabeça pequena de formato anormal e defeitos congênitos em órgãos, muitas vezes fatais'
            },
        ],

        historic_card: [],
        finished: 0

    },


    methods: {
        help: function () {
            let elems = document.querySelectorAll('.tap-target');
            let instances = M.TapTarget.init(elems, {});  

            let instance = M.TapTarget.getInstance(elems[0]);
            instance.open()
        },

        crazy: function () {
          let ones = document.querySelectorAll('.one')
          let length = this.game_data.length

          ones.forEach(e =>{
            let i = Math.round(Math.random() * (length * 2))
            e.style.order = i
          })
        },

        closeAll: function () {
            let ones = document.querySelectorAll('.one')
            ones.forEach(el =>{
                let quest = el.querySelector('.carta')
                let resp = el.querySelector('.ccontent')

                quest.classList.remove('closecard')
                resp.classList.remove('contentClosexard')
            })
        },

        selAni(id) {
            let ef = Math.round(Math.random() * 3)
            if (ef ==0 )
                return ' StartRight';
            if (ef == 1 )
                return ' StartRightbottom';
            if (ef ==2 )
                return ' StartLeftbottom';
            if (ef ==3 )
                return ' StartLefttop';
            
        },


        gain: function () {
            alert('voce ganhou')    
        },

        cardsound: function () {
          let ef = document.querySelector('.sound')
          if (!ef.paused == true) {
            ef.currentTime = 0
          }else {
            ef.play()
          }
        },

        closeCard: function (e) {
            let el = e.target
            this.cardsound()
            let quest = el.querySelector('.carta')
            quest.classList.toggle('closecard')

            let resp = el.querySelector('.ccontent')
            resp.classList.toggle('contentClosexard')

            this.historic_card.push(            {
                id: el.id,
                type: el.getAttribute('type')
            })

            let nHistiric
            if (this.historic_card.length >= 2) {
                nHistiric = this.historic_card
                

                setTimeout(() => {
                    if ((nHistiric[0]['type'] != nHistiric[1]['type']) && (nHistiric[0]['id'] == nHistiric[1]['id'])) {
                        this.finished++
                        let cards = document.querySelectorAll('#' + el.id)
                        cards[0].classList.add('removing')
                        cards[1].classList.add('removing')

                        setTimeout(() => {
                            cards[0].classList.add('opacityCard')
                            cards[1].classList.add('opacityCard')
                            if (this.finished >= this.game_data.length) {
                                this.gain()
                            }
                        }, 800);
                    }
                    this.historic_card = []


                    this.closeAll()
                }, 800);
            }
        },

        startGame: function () {
            let carrousel = document.querySelector('.carrouselin')
            carrousel.classList.add('noCartas')

            let buttonStart = document.querySelector('.startGame')
            buttonStart.classList.add('noCartas')

            let music = document.querySelector('.music')
            music.play()


            let cartas = document.querySelector('.cartas')
            cartas.classList.remove('noCartas')
        }
    }
})