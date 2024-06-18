import { FC } from 'react';
import DocIcon from '../../assets/icons/doc_icon.svg';
import TrashIcon from '../../assets/icons/trash_icon.svg';
import './ManageButton.style.scss'

interface IManageButton {
    onCreate?: () => void;
    onDelete?: () => void;
}

export const ManageButton: FC<IManageButton> = ({ onCreate, onDelete }) => {

    return (
        <div className='button'>
            <DocIcon onClick={onCreate}/>
            <TrashIcon onClick={onDelete}/>
        </div>
    )
}