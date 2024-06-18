import { FC } from 'react';
import { Header } from '../../Components/Header/Header'
import { NavBar } from '../../Components/NavBar/NavBar'
import { Table } from '../../Components/Table/Table'
import './MainPage.style.scss'
import { TableRow } from 'src/Components/TableRow/TableRow';

export const MainPage = () => {

    return (
         <div className='container'>
             <Header/>
             <NavBar/>
             <Table/>
         </div>
    )
}