let dots;
let i = 100;
let iDots = 0;
let result;
let intervalId;
let intervalTwo;
let intervalDots;
let switcher = true;

const handler = (item, event, callback) => {
    item.addEventListener(event, callback)
};

class SliderCarousel {
    constructor({
                    main,
                    time,
                    wrap,
                    next,
                    slide,
                    prev,
                    dotsWrapper,
                    slidesToShow = 1,
                    position = 0,
                }) {
        this.time = time;
        this.main = document.querySelector(main);
        this.slide = document.querySelectorAll(slide);
        this.wrap = document.querySelector(wrap);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.dotsWrapper = document.querySelector(dotsWrapper)
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
        };
    }

    init() {
        this.onload()
        this.controlSlider();
        this.createDots();
        this.createClone();
    }

    onload() {
        handler(document, 'DOMContentLoaded', () => {
            this.wrap.style.transform = `translateX(-${i}%)`;
        })
    }

    createClone() {
        let cloneBegin = this.slide[0].cloneNode(true);
        let cloneLast = this.slide[this.slide.length - 1].cloneNode(true);
        this.wrap.append(cloneBegin);
        cloneBegin.classList.add('clone')
        this.wrap.prepend(cloneLast);
        cloneLast.classList.add('clone')
    }

    createDots() {
        for (let i = 0; i < this.slide.length; i++) {
            const item = document.createElement('li');
            item.classList.add('slider__dot');
            this.dotsWrapper.append(item);
        }
        dots = document.querySelectorAll('.slider__dot');
        dots.forEach((item, index) => {
            item.setAttribute('index', index.toString())
        })
        dots[0].classList.add('dot_active');
    };

    prevSlider() {
        if (i % 100 !== 0) {
            return null
        }
        dots[iDots].classList.remove('dot_active')
        iDots--
        if (iDots < 0) {
            iDots = this.slide.length - 1;
        } else if (iDots === this.slide.length) {
            iDots = 0;
        }
        dots[iDots].classList.add('dot_active')
        if (this.options.position >= 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.slide.length - 1;
            }
            result = 100 * this.options.position
            intervalTwo = setInterval(() => {
                if (((i > 0) && (i <= 100) && switcher) || (i > (this.options.position + 1) * 100)) {
                    if (i > 100) {
                        switcher = false;
                    }
                    i--;
                    this.wrap.style.transform = `translateX(-${i}%)`;

                } else {
                    if (i === 0) {
                        i = 100 * (this.slide.length)
                        this.wrap.style.transform = `translateX(-${i}%)`;
                    } else if (i === 100) {
                        switcher = true

                    }
                    clearInterval(intervalTwo);

                }
            }, this.time)

        }

    }

    nextSlider() {
        if (i % 100 !== 0) {
            return null;
        }
        dots[iDots].classList.remove('dot_active')
        iDots++
        if (iDots < 0) {
            iDots = this.slide.length - 1;
        } else if (iDots === this.slide.length) {
            iDots = 0;
        }
        dots[iDots].classList.add('dot_active')
        if (this.options.position < this.slide.length) {
            ++this.options.position;
            if (this.options.position > this.slide.length - 1) {
                this.options.position = 0
            }
            result = 100 * this.options.position
            if (i === 100 * (this.slide.length - 1) + 100) {
                i = 0;
                this.wrap.style.transform = `translateX(-${i}%)`;
            }
            intervalId = setInterval(() => {
                if (i >= (result) && i < result + 100) {
                    i++;
                    this.wrap.style.transform = `translateX(-${i}%)`;
                } else {
                    clearInterval(intervalId);
                }
            }, this.time)
        }


    }

    controlSlider() {
        handler(this.prev, 'click', () => {
            this.prevSlider(this.slidesToShow);
        });
        handler(this.next, 'click', () => {
            if (i % 100 !== 0) {
                return null;
            }
            clearInterval(intervalId)
            this.nextSlider(this.slidesToShow);
        });
        handler(document, 'click', (e) => {
            const target = e.target;
            if (target.closest('.slider__dot')) {
                if (i % 100 !== 0) {
                    return null;
                }
                clearInterval(intervalDots)

                dots[iDots].classList.remove('dot_active')
                dots.forEach((item) => {
                    item.classList.remove('dot_active');
                })
                iDots = +target.getAttribute('index');
                this.index = iDots;
                intervalDots = setInterval(() => {
                    if (target.closest('.sliders__arrow_left') || target.closest('.sliders__arrow_right')) {
                        return null;
                    }
                    if (i < (iDots + 1) * 100) {
                        i++;
                        this.wrap.style.transform = `translateX(-${i}%)`;
                    } else if (i > (iDots + 1) * 100) {
                        i--;
                        this.wrap.style.transform = `translateX(-${i}%)`;
                    } else {
                        clearInterval(intervalDots)
                    }
                }, this.time)
                target.classList.add('dot_active');
            }
            if (iDots < 0) {
                iDots = this.slide.length - 1;
            } else if (iDots === this.slide.length) {
                iDots = 0;
            }
            dots[iDots].classList.add('dot_active');

        });
    }
}

const carousel = new SliderCarousel({
    main: '.sliders__inner',
    wrap: '.sliders__wrap',
    slide: '.sliders__item',
    next: '.sliders__arrow_right',
    prev: '.sliders__arrow_left',
    dotsWrapper: '.slider__dots',
    time: 5,
});

carousel.init();
