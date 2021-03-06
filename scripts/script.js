document.addEventListener('DOMContentLoaded', () => {
    const agree = document.querySelector('.header__cookie');
    const btnAgree = document.querySelector('.cookie__btn');
    const form = document.querySelector('.form__feedback');
    const formInputs = form.querySelectorAll('.form__inputs');
    const btnSend = form.querySelector('.form__send')
    const taglineImg = document.querySelector('.tagline__img_desktop');
    const taglineText = document.querySelector('.tagline__text')
    const handler = (item, event, callback) => {
        item.addEventListener(event, callback)
    };


    handler(window, 'scroll', () => {
        if(window.pageYOffset>1550&&window.pageYOffset<1950){
            taglineText.style.transform = 'translate(200%)';
            taglineText.style.opacity = '0';
            taglineImg.style.left = '200px'
            setTimeout(() => {
                taglineImg.style.transform = 'rotate(-90deg)';
            }, 1000)
        }
        }

    )
    const isValidTest = () => {
        if ([...formInputs].every(item => item.value !== '')) {
            setTimeout(() => {
                console.log('Form send');
                formInputs.forEach((input) => {
                    input.value = '';
                });
            }, 2000)


        } else {
            formInputs.forEach((input) => {
                if (input.value.trim() === '') {
                    input.classList.add('invalid');
                    setTimeout(() => {
                        input.classList.remove('invalid')
                    }, 2000)
                }
            })

        }
    };

    setTimeout(() => {
        agree.style.bottom = '0%'
    }, 2000)
    handler(btnSend, 'click', (e) => {
        e.preventDefault();
        isValidTest();

    })
    handler(btnAgree, 'click', () => {
        agree.style.bottom = '-50%';

    })


})



