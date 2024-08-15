import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import img1 from '../assets/images/img_1.jpg'
import img2 from '../assets/images/img_2.jpg'
import img3 from '../assets/images/img_3.jpg'
import img4 from '../assets/images/img_4.jpg'
import img5 from '../assets/images/img_5.jpg'
import img6 from '../assets/images/img_6.jpg'
import img7 from '../assets/images/img_7.jpg'
import img8 from '../assets/images/img_8.jpg'
import img9 from '../assets/images/img_9.jpg'
import './Carousel.css'

export default function carousel() {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide:2
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide:2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
 

  return (
    <div className='com'>
        <h1 className='Head'>React MultCarousel</h1>
    
        <div className='com2'>
        <Carousel responsive={responsive} >
          <div className="card">
            <img className='product--image' src={img1} alt="" />
            <h2>Monkey Picture</h2>
            <p className='price'>$29.44</p>
            <p>some description about product..</p>
            <p>
              <button>Add to cart</button>
            </p>
          </div>

          <div className="card">
            <img className='product--image' src={img2} alt="" />
            <h2>Monkey Picture</h2>
            <p className='price'>$29.44</p>
            <p>some description about product..</p>
            <p>
              <button>Add to cart</button>
            </p>
          </div>

          <div className="card">
            <img className='product--image' src={img3} alt="" />
            <h2>Monkey Picture</h2>
            <p className='price'>$29.44</p>
            <p>some description about product..</p>
            <p>
              <button>Add to cart</button>
            </p>
          </div>

          <div className="card">
            <img className='product--image' src={img4} alt="" />
            <h2>Monkey Picture</h2>
            <p className='price'>$29.44</p>
            <p>some description about product..</p>
            <p>
              <button>Add to cart</button>
            </p>
          </div>

          <div className="card">
            <img className='product--image' src={img5} alt="" />
            <h2>Monkey Picture</h2>
            <p className='price'>$29.44</p>
            <p>some description about product..</p>
            <p>
              <button>Add to cart</button>
            </p>
          </div>

          <div className="card">
            <img className='product--image' src={img5} alt="" />
            <h2>Monkey Picture</h2>
            <p className='price'>$29.44</p>
            <p>some description about product..</p>
            <p>
              <button>Add to cart</button>
            </p>
          </div>

          <div className="card">
            <img className='product--image' src={img6} alt="" />
            <h2>Monkey Picture</h2>
            <p className='price'>$29.44</p>
            <p>some description about product..</p>
            <p>
              <button>Add to cart</button>
            </p>
          </div>

          <div className="card">
            <img className='product--image' src={img7} alt="" />
            <h2>Monkey Picture</h2>
            <p className='price'>$29.44</p>
            <p>some description about product..</p>
            <p>
              <button>Add to cart</button>
            </p>
          </div>

          <div className="card">
            <img className='product--image' src={img8} alt="" />
            <h2>Monkey Picture</h2>
            <p className='price'>$29.44</p>
            <p>some description about product..</p>
            <p>
              <button>Add to cart</button>
            </p>
          </div>

          <div className="card">
            <img className='product--image' src={img9} alt="" />
            <h2>Monkey Picture</h2>
            <p className='price'>$29.44</p>
            <p>some description about product..</p>
            <p>
              <button>Add to cart</button>
            </p>
          </div>
        </Carousel>
        </div>
        
    </div>
  )
}
