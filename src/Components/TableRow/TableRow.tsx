import { FC, useCallback, useState } from 'react';
import './TableRow.style.scss'
import { ManageButton } from '../ManageButton/ManageButton';
import { IRow } from 'src/models/IRow';
import { Mode } from './TableRow.modes';
import { EditRow } from '../EditRow/EditRow';
import { inputHandlers } from '../../helpers/inputHandlers';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { createRow, deleteRow, updateRow  } from 'src/store/rowSlice';

interface ITableRow {
    rowData : IRow
    level?: number
}

export const TableRow: FC<ITableRow> = ({
    rowData,
    level = 0,
}) => {

    const [mode, setMode] = useState<Mode>(Mode.Default);
    const dispatch = useAppDispatch();
    const rows = useAppSelector((state) => state.rows.list);

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

    const createRowInEntity = () => {
        setMode(Mode.Create);
    }

    const deleteRowInEntity = () => {
        if (rowData.id) {
            console.log(rowData.id)
            dispatch(deleteRow(rowData.id))
        }
    }

    const clearEditRow = () => {
        setMode(Mode.Default);
    }

    const localCreateRow = ((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e?.key === 'Enter') {

            const row : IRow = {
                parentId: rowData.id,
                rowName: rowNameValue,
                salary: salaryValue,
                equipmentCosts: equipmentCostsValue,
                overheads: overheadsValue,
                estimatedProfit: estimatedProfitValue,
                child: []
            };

            if (mode === Mode.Create) {
                dispatch(createRow(row))
            } else {
                dispatch(updateRow(row))
            }
        
            setMode(Mode.Default);
        
            setRowNameValue('');
            setSalaryValue(0);
            setEquipmentCostsValue(0);
            setEstimatedProfitValue(0);
            setOverheadsValue(0);

            console.log(rows)
        }
      });

    const handleDoubleClick = (() => {
        if (rowData.rowName && mode !== Mode.Edit) {
            setRowNameValue(rowData.rowName);
        }
        setEquipmentCostsValue(rowData.equipmentCosts);
        setEstimatedProfitValue(rowData.estimatedProfit);
        setOverheadsValue(rowData.overheads);
        setSalaryValue(rowData.salary)

        setMode(Mode.Edit);
    })

    return (
        <>
        {
            mode !== Mode.Edit && (
                <div className='row__container' onDoubleClick={handleDoubleClick}>
                    <div className={`button__container level_${level}`}>
                        <ManageButton
                            onCreate={createRowInEntity}
                            onDelete={deleteRowInEntity}
                        />
                    </div>
                    <div className='data__container'><p>{rowData.rowName}</p></div>
                    <div className='data__container'><p>{rowData.salary}</p></div>
                    <div className='data__container'><p>{rowData.equipmentCosts}</p></div>
                    <div className='data__container'><p>{rowData.overheads}</p></div>
                    <div className='data__container'><p>{rowData.estimatedProfit}</p></div>
                </div>
            )
        }
        {
            mode === Mode.Edit && (
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
                    level={level} 
                    clearEditRow={clearEditRow}
                />
            )
        }
        {
            rowData.child && rowData.child.map( (child: IRow) => {
                return (
                    <TableRow
                        key={child.id}
                        rowData={child}
                        level={level + 1}
                    />
                )
            })
        }
        {
            mode === Mode.Create && (
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
                    level={level + 1} 
                    clearEditRow={clearEditRow}
                />
            )
        }
        </>
    )
}