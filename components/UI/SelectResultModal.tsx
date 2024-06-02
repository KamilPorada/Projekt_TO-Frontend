import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

interface ModalProps {
  onClose: () => void;
  data: Record<string, any>[];
}

const SelectResultModal: React.FC<ModalProps> = ({ onClose, data }) => {
  const renderTableHeaders = () => {
    if (data.length === 0) return null;
    const headers = Object.keys(data[0]);
    return (
      <tr>
        {headers.map((header, idx) => (
          <th key={idx} className="px-4 py-2 border border-black bg-mainColor text-white font-normal">
            {header}
          </th>
        ))}
      </tr>
    );
  };

  const renderTableRows = () => {
    return data.map((row, idx) => (
      <tr key={idx}>
        {Object.values(row).map((value, cellIdx) => (
          <td key={cellIdx} className="px-4 py-2 border border-black text-center">
            {value}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-40 p-5">
      <div className="flex flex-col justify-center items-center gap-5 bg-white w-auto rounded-lg p-10">
        <div className="flex flex-row justify-center items-center gap-3">
          <h3 className="font-bold text-lg lg:text-2xl">Select query results</h3>
          <FontAwesomeIcon icon={faCode} className="text-2xl lg:text-3xl text-mainColor" />
        </div>

        <table className="table-auto w-full border-collapse">
          <thead>{renderTableHeaders()}</thead>
          <tbody>{renderTableRows()}</tbody>
        </table>

        <div className="flex flex-row justify-center items-center gap-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default SelectResultModal;
