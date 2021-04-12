const container = document.querySelector('.container')
const timeline = container.querySelector('.timeline')
const animationPizza = container.querySelector('#animation_pizza g')
const slicesArea = animationPizza.querySelectorAll('.slice_event_area')
const numbers_slices = animationPizza.querySelectorAll('svg .number_slice')
const items = container.querySelectorAll('.timeline .item')
const deg = 360 / 8
let current = 1
let prev = 1

let pizzas = [
    {
        number: 1,
        title: 'Let’s start with why Pizza is Perfect.',
        description: 'It is seen as superior to many of it’s fast food competitors, like burgers or tacos. Pizza is a balanced nutritional slice of food group harmony. Perfect Pizza is like a skilled conductor.'
    },
    {
        number: 2,
        title: 'Superior dough for your dough',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem et totam culpa exercitationem, tenetur debitis. Velit accusamus delectus in explicabo dicta! Labore nisi quos praesentium! Ducimus corporis molestias cumque!'
    },
    {
        number: 3,
        title: 'A real crust-pleaser',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem et totam culpa exercitationem, tenetur debitis. Velit accusamus delectus in explicabo dicta! Labore nisi quos praesentium! Ducimus corporis molestias cumque!'
    },
    {
        number: 4,
        title: 'Fresh ingredients',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem et totam culpa exercitationem, tenetur debitis. Velit accusamus delectus in explicabo dicta! Labore nisi quos praesentium! Ducimus corporis molestias cumque!'
    },
    {
        number: 5,
        title: 'Title 5',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem et totam culpa exercitationem, tenetur debitis. Velit accusamus delectus in explicabo dicta! Labore nisi quos praesentium! Ducimus corporis molestias cumque!'
    },
    {
        number: 6,
        title: 'Title 6',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem et totam culpa exercitationem, tenetur debitis. Velit accusamus delectus in explicabo dicta! Labore nisi quos praesentium! Ducimus corporis molestias cumque!'
    },
    {
        number: 7,
        title: 'Title 7',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem et totam culpa exercitationem, tenetur debitis. Velit accusamus delectus in explicabo dicta! Labore nisi quos praesentium! Ducimus corporis molestias cumque!'
    },
    {
        number: 8,
        title: 'Title 8',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem et totam culpa exercitationem, tenetur debitis. Velit accusamus delectus in explicabo dicta! Labore nisi quos praesentium! Ducimus corporis molestias cumque!'
    }
]

items.forEach(item=> {
    item.addEventListener('click', ()=> {
        activeItem(item)
    })
})

function selectNextSlice(){
    if(current==8) return
    activeItem(items[current])
}

function selectPrevSlice(){
    if(current==1) return
    activeItem(items[current-2])
}

function activeItem(item){
    container.querySelector('.item.active').classList.remove('active')
    item.classList.add('active')
    const slice = parseInt(item.dataset.slice)
    select(slice)
    let translate
    const columns = 8 - parseInt(getComputedStyle(timeline).getPropertyValue('--columns').trim()) + 1

    if(item.dataset.slice > columns){
        translate = item.offsetWidth * (columns - 1)
    }else{
        translate = item.offsetWidth * (slice - 1)
    }
    items.forEach(item=>{
        item.style.transform = `translateX(-${translate}px)`
    })
}


gsap.set(animationPizza, {transformOrigin: '360px 360px'});
numbers_slices.forEach(number_slice=>{
    gsap.set(number_slice, {transformOrigin: "50% 50%"});
})

slicesArea.forEach(slice=>{
    slice.addEventListener('click', ()=> {
        const target = parseInt(slice.dataset.slice)
        if(current == target) return
        activeItem(items[target-1])
    })
})

function changeInfo(){
    container.querySelector('.number_active').classList.replace(`slice${prev}`,`slice${current}`)
    container.querySelector('.title').textContent = pizzas[current-1].title
    container.querySelector('.description').textContent = pizzas[current-1].description
}

function select(slice){
    if(current == slice) return
    animationPizza.querySelector('.slice.active').classList.remove('active')
    let duration = 0
    prev = current
    if(slice > current){
        duration = 8 - (slice - current)
    }else{
        duration = current - slice
    }
    duration = duration * 0.8
    let rotate = 360 - (slice * deg) + deg
    
    switch(slice){
        case 2: 
            rotate +=2
            break
        case 8:
            rotate +=1.5
            break
        case 5:
            rotate +=2
            break
        case 4:
            rotate +=1
            break
        case 3:
            rotate +=0.5
            break
        default:
            rotate = rotate
            break
    }

    animationPizza.querySelector(`#slice${current}_disable`).beginElement();
    current = slice
    changeInfo()
    setTimeout(()=> {
        gsap.to(animationPizza, duration, {
            rotation: `${rotate}_cw`,
            onComplete: ()=> {
                animationPizza.querySelector(`#slice${slice}`).beginElement();
                animationPizza.querySelector(`.slice.slice${slice}`).classList.add('active')
            }
        });
        numbers_slices.forEach(number_slice=>{
            gsap.to(number_slice, duration, {
                rotation: `-${rotate}_ccw`
            });
        })
    }, 500)
}