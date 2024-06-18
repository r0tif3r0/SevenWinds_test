import { FC } from 'react';
import ArrowDownIcon from '../../assets/icons/arrow_down_icon.svg';
import NavBarIcon from '../../assets/icons/navbar_icon.svg';
import './NavBar.style.scss'

export const NavBar: FC = () => {

    return (
        <div className='navbar__container'>
            <div className='navbar__title'>
                <div className='title__info'>
                    <p className='project-name'>Название проекта</p>
                    <p className='abbreviation'>Аббревиатура</p>
                </div>
                <ArrowDownIcon/>
            </div>
            <div className='navbar__content'>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>По проекту</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>Объекты</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>РД</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>МТО</p>
                </div>
                <div className='content__item active'>
                    <NavBarIcon/>
                    <p className='item__name'>СМР</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>График</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>Мим</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>Рабочие</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>Капвложения</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>Бюджет</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>Финансирование</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>Панорамы</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>Камеры</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>Поручения</p>
                </div>
                <div className='content__item'>
                    <NavBarIcon/>
                    <p className='item__name'>Контрагенты</p>
                </div>
            </div>
        </div>
    )
}