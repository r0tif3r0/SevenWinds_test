import { FC } from 'react';
import './EditRow.style.scss'
import { ManageButton } from '../ManageButton/ManageButton';

interface IEditRow {
    rowNameValue: string;
    salaryValue: number;
    equipmentCostsValue: number;
    overheadsValue: number;
    estimatedProfitValue: number;
    handleRowNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSalaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEquipmentCostsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOverheadsValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEstimatedProfitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    localUpdateRow: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    level: number;
    clearEditRow?: () => void;
  }

export const EditRow: FC<IEditRow> = ({
    rowNameValue,
    salaryValue,
    equipmentCostsValue,
    overheadsValue,
    estimatedProfitValue,
    handleRowNameChange,
    handleSalaryChange,
    handleEquipmentCostsChange,
    handleOverheadsValueChange,
    handleEstimatedProfitChange,
    localUpdateRow,
    level,
    clearEditRow,
}) => {

    return (
        <div className='row__container'>
            <div className={`button__container level_${level}`}>
                <ManageButton
                    onDelete={clearEditRow}
                />
            </div>
            <div className='input__container'>
                <input 
                    type="text" 
                    value={String(rowNameValue)} 
                    onChange={handleRowNameChange}
                    onKeyDown={(e) => localUpdateRow(e)}
                />
            </div>
            <div className='input__container'>
                <input 
                    type="number" 
                    value={salaryValue} 
                    onChange={handleSalaryChange} 
                    onKeyDown={(e) => localUpdateRow(e)}
                />
            </div>
            <div className='input__container'>
                <input 
                    type="number" 
                    value={equipmentCostsValue} 
                    onChange={handleEquipmentCostsChange}
                    onKeyDown={(e) => localUpdateRow(e)}
                />
            </div>
            <div className='input__container'>
                <input 
                    type="number" 
                    value={overheadsValue} 
                    onChange={handleOverheadsValueChange}
                    onKeyDown={(e) => localUpdateRow(e)}
                />
            </div>
            <div className='input__container'>
                <input 
                    type="number" 
                    value={estimatedProfitValue} 
                    onChange={handleEstimatedProfitChange}
                    onKeyDown={(e) => localUpdateRow(e)}
                />
            </div>
        </div>
    )
}