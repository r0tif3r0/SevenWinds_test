import { FC } from 'react';
import MenuIcon from '../../assets/icons/menu_icon.svg';
import PrevIcon from '../../assets/icons/prev_icon.svg';
import './Header.style.scss'

export const Header: FC = () => {

    return (
        <div className='header__container'>
            <div className='header__icons'>
                <MenuIcon/>
                <PrevIcon/>
            </div>
            <div className='header__items'>
                <p className='active'>Просмотр</p>
                <p>Управление</p>
            </div>
        </div>
    )
}