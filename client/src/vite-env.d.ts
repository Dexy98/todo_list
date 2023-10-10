/// <reference types="vite/client" />

export type TNotes = {
  _id: string;
  title: string;
  description: string;
  userId?: string;
};

export type TUsers = {
  _id: string;
  userName: string;
  password: string;
};

export type TLoginState = {
  data: {
    user: TUsers;
  };
};

// <div className="overflow-x-auto">
//                     <table className="table max-w-lg m-auto">
//                         {/* head */}
//                         <thead>
//                             <tr>
//                                 <th></th>
//                                 <th>Titolo</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* row 1 */}
//                             <tr className="hover transition-all">
//                                 <th>
//                                     <input type="checkbox" className="checkbox" checked={note.complete} />
//                                 </th>
//                                 <div className="flex items-center justify-between">

//                                     <td>{note.title}</td>
//                                     <button className="btn btn-error">🗑</button>
//                                 </div>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
