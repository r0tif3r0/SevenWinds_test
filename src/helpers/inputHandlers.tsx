import React, { useCallback, useState } from "react";

export const inputHandlers = () => {
  const [rowNameValue, setRowNameValue] = useState<string>('');
  const [salaryValue, setSalaryValue] = useState<number>(0);
  const [equipmentCostsValue, setEquipmentCostsValue] = useState<number>(0);
  const [overheadsValue, setOverheadsValue] = useState<number>(0);
  const [estimatedProfitValue, setEstimatedProfitValue] = useState<number>(0);

  const handleRowNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowNameValue(e.target.value);
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryValue(Number(e.target.value));
  };

  const handleEquipmentCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEquipmentCostsValue(Number(e.target.value));
  };

  const handleOverheadsValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOverheadsValue(Number(e.target.value));
  };

  const handleEstimatedProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimatedProfitValue(Number(e.target.value));
  };

  return {
    rowNameValue,
    setRowNameValue,
    handleRowNameChange,
    salaryValue,
    setSalaryValue,
    handleSalaryChange,
    equipmentCostsValue,
    setEquipmentCostsValue,
    handleEquipmentCostsChange,
    overheadsValue,
    setOverheadsValue,
    handleOverheadsValueChange,
    estimatedProfitValue,
    setEstimatedProfitValue,
    handleEstimatedProfitChange
  };
};