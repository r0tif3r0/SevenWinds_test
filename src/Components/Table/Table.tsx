import { FC, useEffect} from 'react';
import './Table.style.scss'
import { TableRow } from '../TableRow/TableRow';
import { IRow } from 'src/models/IRow';
import { EditRow } from '../EditRow/EditRow';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { createRow, getTreeRows } from 'src/store/rowSlice';
import { inputHandlers } from '../../helpers/inputHandlers';

export const Table: FC = () => {
    const rows = useAppSelector((state) => state.rows.list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTreeRows())
    }, [dispatch])

    const {
        rowNameValue,
        salaryValue,
        equipmentCostsValue,
        overheadsValue,
        estimatedProfitValue,
        setRowNameValue,
        setSalaryValue,
        setEquipmentCostsValue,
        setEstimatedProfitValue,
        setOverheadsValue,
        handleRowNameChange,
        handleSalaryChange,
        handleEquipmentCostsChange,
        handleOverheadsValueChange,
        handleEstimatedProfitChange,
    } = inputHandlers();

    const localCreateRow = ((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e?.key === 'Enter') {

            const row : IRow = {
                parentId: null,
                rowName: rowNameValue,
                salary: salaryValue,
                equipmentCosts: equipmentCostsValue,
                overheads: overheadsValue,
                estimatedProfit: estimatedProfitValue,
                child: []
            };

            dispatch(createRow(row))
        
            setRowNameValue('');
            setSalaryValue(0);
            setEquipmentCostsValue(0);
            setEstimatedProfitValue(0);
            setOverheadsValue(0);
        }
    });

    return (
        <div className='table__container'>
            <div className='table__titles'>
                <p className='title'>Строительно-монтажные работы</p>
            </div>
            <div className='table__content'>
                <div className='table__headers'>
                    <span>Уровень</span>
                    <span>Наименование работ</span>
                    <span>Основная з/п</span>
                    <span>Оборудование</span>
                    <span>Накладные расходы</span>
                    <span>Сметная прибыль</span>
                </div>
                {
                    !rows.length && (
                        <EditRow
                            rowNameValue={rowNameValue}
                            salaryValue={salaryValue}
                            equipmentCostsValue={equipmentCostsValue}
                            overheadsValue={overheadsValue}
                            estimatedProfitValue={estimatedProfitValue}
                            handleRowNameChange={handleRowNameChange}
                            handleSalaryChange={handleSalaryChange}
                            handleEquipmentCostsChange={handleEquipmentCostsChange}
                            handleOverheadsValueChange={handleOverheadsValueChange}
                            handleEstimatedProfitChange={handleEstimatedProfitChange}
                            localUpdateRow={localCreateRow}
                            level={0}
                        />
                    )
                }
                {
                    rows.map((row: IRow) => {
                        return (
                            <TableRow
                                key={row.id}
                                rowData={row}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}