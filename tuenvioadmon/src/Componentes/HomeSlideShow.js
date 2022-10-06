import React, { useRef } from 'react';

//Imagenes
import img1 from '../Imagenes/img1.jpg';
import img2 from '../Imagenes/img2.jpg';
import img3 from '../Imagenes/img3.jpg';
import img4 from '../Imagenes/img4.jpg';

//SVG
import { ReactComponent as FlechaI } from '../Imagenes/iconLeft.svg';
import { ReactComponent as FlechaD } from '../Imagenes/iconRight.svg';

//Pages
import '../Estilos/HomeStyle.css';

//Componente funcional de estilizacion de la app basicamente un carrucel de imagenes que se ejecutan de manera automatica.

const HomeSlideShow = () => {
   const slideshow = useRef(null);
   
    const siguiente = () => {
        // if (slideshow.current.children.length > 0) {

            const primerElemento = slideshow.current.children[0];
            slideshow.current.style.transition = `300ms ease-out all`;
            const tamanoSlide = slideshow.current.children[0].offsetWidth;
            slideshow.current.style.transform = `translateX(-${tamanoSlide}px)`;


            const transicion = () => {
                slideshow.current.style.transition = 'none';
                slideshow.current.style.transform = 'translateX(0)';
                slideshow.current.appendChild(primerElemento);
                slideshow.current.removeEventListener('transitionend', transicion);
            }

            slideshow.current.addEventListener('transitionend', transicion);
        // } 
    }
    const anterior = () => {
        // if (slideshow.current.children.length > 0) {
            const index = slideshow.current.children.length - 1;
            const ultimoElemento = slideshow.current.children[index];
            slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild);
            slideshow.current.style.transition = 'none';
            const tamanoSlide = slideshow.current.children[0].offsetWidth;
            slideshow.current.style.transform = `translateX(-${tamanoSlide}px)`;

            setTimeout(() => {
                slideshow.current.style.transition = '300ms ease-out all';
                slideshow.current.style.transform = `translateX(0)`;
            }, 30);
        // // }


    }
//TODO:Volver a activar y corregir error
    setInterval(() => {
        siguiente();
     }, 5000);
    return (
        <div className='cont-principal'>
            <div className='cont-slideShow' ref={slideshow}>
                <div className='cont-slide'>
                    <img src={img1} alt='marketing' className='img' ></img>
                    <div className='texto-promosional'>
                        <p>Todo lo que necesitas al alcanze de un click</p>
                    </div>

                </div>
                <div className='cont-slide'>
                    <img src={img2} alt='marketing' className='img' ></img>
                    <div className='texto-promosional'>
                        <p>Con lo más actual en el mundo de la moda</p>
                    </div>

                </div>
                <div className='cont-slide'>
                    <img src={img3} alt='marketing' className='img' ></img>
                    <div className='texto-promosional'>
                        <p>Confort y tranquilidad desde tu hogar</p>
                    </div>

                </div>
                <div className='cont-slide'>
                    <img src={img4} alt='marketing' className='img' ></img>
                    <div className='texto-promosional'>
                        <p>Rapidez y confianza en tus pedidos</p>
                    </div>

                </div>
                <div className='cont-controles'>


                    <button onClick={anterior}><FlechaI className='boton'></FlechaI></button>
                    <button onClick={siguiente} ><FlechaD className='boton-D'></FlechaD></button>

                </div>

            </div>



        </div>
    )
}

export default HomeSlideShow