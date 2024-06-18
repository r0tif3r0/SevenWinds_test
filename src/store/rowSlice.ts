import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Header } from "src/Components/Header/Header";
import $api from "src/api/axios.api";
import { IRow } from "src/models/IRow";

type RowsState = {
    list: IRow[]
}

const initialState: RowsState = {
    list: []
}

export const getTreeRows = createAsyncThunk<IRow[]>(
    'rows/list',
    async function () {
        try {
            const response = await $api.get('/row/list')
            return response.data
        } catch (e) {
            console.error(e);
        }
    }
);

export const createRow = createAsyncThunk<{changed: IRow[], current: IRow}, IRow>(
    'rows/create',
    async function (row) {
        const newRow: IRow = {
            child: row.child,
            equipmentCosts: row.equipmentCosts,
            estimatedProfit: row.estimatedProfit,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: row.overheads,
            parentId: row?.parentId || null,
            rowName: row?.rowName || null,
            salary: row.salary,
            supportCosts: 0,
        }
        try {
            const response = await $api.post('/row/create', newRow)
            response.data.current.parentId = newRow.parentId
            response.data.current.child = newRow.child
            return response.data
        } catch (e) {
            console.error(e);
        }
    }
)

export const updateRow = createAsyncThunk<{changed: IRow[], current: IRow}, IRow>(
    'rows/update',
    async function (row) {
        const newRow: IRow = {
            child: row.child,
            equipmentCosts: row.equipmentCosts,
            estimatedProfit: row.estimatedProfit,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: row.overheads,
            parentId: row?.parentId || null,
            rowName: row?.rowName || null,
            salary: row.salary,
            supportCosts: 0,
        }
        try {
            const response = await $api.post(`/row/${newRow.parentId}/update`, newRow)
            response.data.current.parentId = newRow.parentId
            response.data.current.child = newRow.child
            return response.data
        } catch (e) {
            console.error(e);
        }
    }
)

export const deleteRow = createAsyncThunk<{changed: IRow[], currentId: number}, number>(
    'rows/delete',
    async function (rId) {
        try {
            const response = await $api.delete(`/row/${rId}/delete`)
            response.data.currentId = rId
            return response.data
        } catch (e) {
            console.error(e);
        }
    }
)

const addRowByCurrentRow = (rows: IRow[], currentRow: IRow) => {
    if (currentRow.parentId === null) {
        rows.push(currentRow)
        return
    }
    for (const row of rows) {
        if (row.id === currentRow.parentId) {
            row.child.push(currentRow)
            return
        }
        
        if (row.child && row.child.length > 0) {
            addRowByCurrentRow(row.child, currentRow);
        }
    }
    return
}

const updateRowByChangedRow = (rows: IRow[], changedRow: IRow) => {
    for (const row of rows) {
        if (row.id === changedRow.id) {
            row.rowName = changedRow.rowName
            row.equipmentCosts = changedRow.equipmentCosts
            row.estimatedProfit = changedRow.estimatedProfit
            row.overheads = changedRow.overheads
            row.salary = changedRow.salary
        }

        if (row.child && row.child.length > 0) {
            updateRowByChangedRow(row.child, changedRow);
        }
    }
    return
}

const deleteRowByCurrentId = (rows: IRow[], currentId: number) => {
    rows.forEach((row, index) => {
        if (row.id === currentId) {
            rows.splice(index, 1);
        } else if (row.child) {
            deleteRowByCurrentId(row.child, currentId);
        }
    });
}

const rowSlice = createSlice ({
    name: 'rows',
    initialState,
    reducers: {
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(getTreeRows.fulfilled, (state, action) => {
                action.payload.map((row: IRow) => {
                    state.list.push(row)
                })
            })
            .addCase(createRow.fulfilled, (state, action) => {
                addRowByCurrentRow(state.list as IRow[], action.payload.current)
                action.payload.changed.map((changedRow: IRow) => {
                    updateRowByChangedRow(state.list as IRow[], changedRow)
                })
            })
            .addCase(deleteRow.fulfilled, (state, action) => {
                deleteRowByCurrentId(state.list as IRow[], action.payload.currentId)
                action.payload.changed.map((changedRow: IRow) => {
                    updateRowByChangedRow(state.list as IRow[], changedRow)
                })
            })
            .addCase(updateRow.fulfilled, (state, action) => {
                updateRowByChangedRow(state.list as IRow[], action.payload.current)
                action.payload.changed.map((changedRow: IRow) => {
                    updateRowByChangedRow(state.list as IRow[], changedRow)
                })
            })
    }
});

export default rowSlice.reducer;