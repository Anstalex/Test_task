const handler = (item, event, callback) => {
    item.addEventListener(event, callback)
};

class SliderCarousel {
    constructor({
                    main,
                    time,
                    wrap,
                    next,
                    slide = [],
                    prev,
                    dotsWrapper,
                    slidesToShow = 1,
                    position = 0,
                    intervalId,
                    intervalTwo,
                    intervalDots,
                    result,
                    iDots = 0,
                    dots,
                    slideNumber = 4,
                    i = 100,
                    switcher = true,
                }) {
        this.slide = slide;
        this.slideNumber = slideNumber;
        this.switcher = switcher;
        this.i = i;
        this.dots = dots;
        this.iDots = iDots;
        this.result = result;
        this.intervalId = intervalId;
        this.intervalTwo = intervalTwo;
        this.time = time;
        this.main = document.querySelector(main);
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.dotsWrapper = document.querySelector(dotsWrapper)
        this.slidesToShow = slidesToShow;
        this.intervalDots = intervalDots;
        this.options = {
            position,
        };
    }

    init() {
        this.createSlide();
        this.onload();
        this.controlSlider();
        this.createDots();
        this.createClone();
    }

    onload() {
        handler(document, 'DOMContentLoaded', () => {
            this.wrap.style.transform = `translateX(-${this.i}%)`;
        })
    }

    createClone() {
        let cloneBegin = this.slide[0].cloneNode(true);
        let cloneLast = this.slide[this.slideNumber - 1].cloneNode(true);
        this.wrap.append(cloneBegin);
        cloneBegin.classList.add('clone')
        this.wrap.prepend(cloneLast);
        cloneLast.classList.add('clone')
    }

    createSlide() {
        for (let i = 0; i < this.slideNumber; i++) {
            const slide = document.createElement('div');
            const img = document.createElement('img');
            img.src = `images/slider/${i + 1}.jpg`
            slide.classList.add('sliders__item');
            slide.appendChild(img);
            this.wrap.appendChild(slide);
            this.slide.push(slide);
        }
    }

    createDots() {
        for (let i = 0; i < this.slideNumber; i++) {
            const item = document.createElement('li');
            item.classList.add('slider__dot');
            this.dotsWrapper.append(item);
        }
        this.dots = document.querySelectorAll('.slider__dot');
        this.dots.forEach((item, index) => {
            item.setAttribute('index', index.toString())
        })
        this.dots[0].classList.add('dot_active');
    };

    prevSlider() {
        clearInterval(this.intervalTwo);
        if (this.i % 100 !== 0) {
            return null
        }
        this.dots[this.iDots].classList.remove('dot_active')
        this.iDots--
        if (this.iDots < 0) {
            this.iDots = this.slideNumber - 1;
        } else if (this.iDots === this.slideNumber) {
            this.iDots = 0;
        }
        this.dots[this.iDots].classList.add('dot_active')
        if (this.options.position >= 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.slideNumber - 1;
            }
            this.result = 100 * this.options.position
            this.intervalTwo = setInterval(() => {
                if (((this.i > 0) && (this.i <= 100) && this.switcher) || (this.i > (this.options.position + 1) * 100)) {
                    if (this.i > 100) {
                        this.switcher = false;
                    }
                    this.i--;
                    this.wrap.style.transform = `translateX(-${this.i}%)`;
                } else {
                    if (this.i === 0) {
                        this.i = 100 * (this.slideNumber)
                        this.wrap.style.transform = `translateX(-${this.i}%)`;
                    } else if (this.i === 100) {
                        this.switcher = true

                    }
                    clearInterval(this.intervalTwo);

                }
            }, this.time)

        }

    }

    nextSlider() {
        clearInterval(this.intervalId);
        if (this.i % 100 !== 0) {
            return null;
        }
        this.dots[this.iDots].classList.remove('dot_active')
        this.iDots++
        if (this.iDots < 0) {
            this.iDots = this.slideNumber - 1;
        } else if (this.iDots === this.slideNumber) {
            this.iDots = 0;
        }
        this.dots[this.iDots].classList.add('dot_active')
        if (this.options.position < this.slideNumber) {
            ++this.options.position;
            if (this.options.position > this.slideNumber - 1) {
                this.options.position = 0
            }
            this.result = 100 * this.options.position
            if (this.i === 100 * (this.slideNumber - 1) + 100) {
                this.i = 0;
                this.wrap.style.transform = `translateX(-${this.i}%)`;
            }
            this.intervalId = setInterval(() => {
                if (this.i >= (this.result) && this.i < this.result + 100) {
                    this.i++;
                    this.wrap.style.transform = `translateX(-${this.i}%)`;
                } else {
                    clearInterval(this.intervalId);
                }
            }, this.time)
        }


    }

    controlSlider() {
        handler(this.prev, 'click', () => {
            if (this.i % 100 !== 0) {
                return null;
            }
            this.prevSlider(this.slidesToShow);
        });
        handler(this.next, 'click', () => {
            if (this.i % 100 !== 0) {
                return null;
            }
            this.nextSlider(this.slidesToShow);
        });
        handler(document, 'click', (e) => {
            const target = e.target;
            if (this.i % 100 !== 0) {
                return null;
            }
            if (target.closest('.slider__dot')) {
                clearInterval(this.intervalDots)
                this.dots[this.iDots].classList.remove('dot_active')
                this.dots.forEach((item) => {
                    item.classList.remove('dot_active');
                })
                this.iDots = +target.getAttribute('index');
                this.index = this.iDots;
                this.intervalDots = setInterval(() => {
                    if (target.closest('.sliders__arrow_left') || target.closest('.sliders__arrow_right')) {
                        return null;
                    }
                    if (this.i < (this.iDots + 1) * 100) {
                        this.i++;
                        this.wrap.style.transform = `translateX(-${this.i}%)`;
                    } else if (this.i > (this.iDots + 1) * 100) {
                        this.i--;
                        this.wrap.style.transform = `translateX(-${this.i}%)`;
                    } else {
                        clearInterval(this.intervalDots)
                    }
                }, this.time)
                target.classList.add('dot_active');
            }
            if (this.iDots < 0) {
                this.iDots = this.slideNumber - 1;
            } else if (this.iDots === this.slideNumber) {
                this.iDots = 0;
            }
            this.dots[this.iDots].classList.add('dot_active');
        });
    }
}

const carousel = new SliderCarousel({
    main: '.sliders__inner',
    wrap: '.sliders__wrap',
    next: '.sliders__arrow_right',
    prev: '.sliders__arrow_left',
    dotsWrapper: '.slider__dots',
    time: 5,
    slideNumber: 4,
});

carousel.init();
