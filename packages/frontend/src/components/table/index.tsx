import {

  EuiBasicTable,
  EuiBasicTableColumn,

} from "@elastic/eui";
// type User = {
//   id: number;
//   firstName: string | null | undefined;
//   lastName: string;
//   github: string;
//   dateOfBirth: Date;
//   online: boolean;
//   location: {
//     city: string;
//     country: string;
//   };
// };

export interface TableProps<T> {
  items: Array<any>;
  columns: Array<EuiBasicTableColumn<T>>;
}

// const columns: Array<EuiBasicTableColumn<any>> = [
//   {
//     field: "firstName",
//     name: "First Name",
//   },
//   {
//     field: "lastName",
//     name: "Last Name",
//   },
//   {
//     field: "dateOfBirth",
//     name: "Date of Birth",
//     dataType: "date",
//   },
//   {
//     name: "Actions",
//     actions: [
//       {
//         name: "Clone",
//         description: "Clone this person",
//         type: "icon",
//         icon: "copy",
//         onClick: () => "",
//       },
//     ],
//   },
// ];

export const Table: React.FC<TableProps<any>> = ({ columns, items }) => {
  return (
    <EuiBasicTable
      tableCaption="Demo of EuiBasicTable with expanding rows"
      items={items}
      itemId="id"
      isExpandable={true}
      hasActions={true}
      columns={columns}
    />
  );
};
