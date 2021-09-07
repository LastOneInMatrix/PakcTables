import React, {useState} from "react";
import s from "./TablePackList.module.scss";
import global from "../../../../style/global.module.scss";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../app/store";
import {PackDomainType, removePack, updatePackTitle} from "../../packReduser";
import {Button} from "../../../common/Button/Button";
import {Link} from "react-router-dom";
import {Modal} from "../../../common/Modal/Modal";
import {InputField} from "../../../common/InputField/InputField";
import {
   actionsForStateOfMyPackSortDate,
} from "../../../common/StateOfMyPackSortDate/StateOfMyPackSortDateReduser";

type TablePackListPropsType = {}


export const TablePackList: React.FC<TablePackListPropsType> = () => {

   const me = useSelector<AppRootStateType, string>(state => state.login._id);
   const pack = useSelector<AppRootStateType, PackDomainType[]>(state => state.pack);

   const [deleteModalActive, setDeleteModalActive] = useState(false);
   const [deletePackId, setDeletePackId] = useState({id: '', name: ''});

   const [editModalActive, setEditModalActive] = useState(false);
   const [editPackName, setEditPackName] = useState('');
   const [editOrDeleteValue, setEditOrDeleteValue] = useState({id: '', name: ''});

   const dispatch = useDispatch();

   const deletePackHandler = () => {
      dispatch(removePack(deletePackId.id));
      setDeleteModalActive(false);
   }
   const deleteOpenModal = (id: string, name: string) => {
      setDeletePackId({id, name});
      setDeleteModalActive(true);
   }


   const saveEditPackHandler = () => {
      dispatch(updatePackTitle({name: editPackName, _id: editOrDeleteValue.id}));
      setEditModalActive(false);
   }
   const openEditModalHandler = (id: string, name: string) => {
      setEditModalActive(true);
      setEditOrDeleteValue({id, name});
   }
   const cancelEditModalHandler = () => {
      setEditModalActive(false);
      setEditPackName('');
   }

   return (
      <div className={s.table}>
         <table className={s.table__block}>
            <thead>
            <tr>
               <th className={s.col1}>Name
                  <div className={s.containerArrows3}>
                     <div className={`${s.arrows} ${s.arrowsUp}`} onClick={()=>{
                        dispatch(actionsForStateOfMyPackSortDate.setSortValue('0name'))
                        dispatch(actionsForStateOfMyPackSortDate.setFlagData(true))
                     }}></div>
                     <div className={`${s.arrows} ${s.arrowsDown}`} onClick={()=>{
                        dispatch(actionsForStateOfMyPackSortDate.setSortValue('1name'))
                        dispatch(actionsForStateOfMyPackSortDate.setFlagData(true))
                     }}></div>
                  </div>
               </th>
               <th className={s.col2}>Cards
                  <div className={s.containerArrows2}>
                     <div className={`${s.arrows} ${s.arrowsUp}`} onClick={()=>{
                        dispatch(actionsForStateOfMyPackSortDate.setSortValue('0cardsCount'))
                        dispatch(actionsForStateOfMyPackSortDate.setFlagData(true))
                     }}></div>
                     <div className={`${s.arrows} ${s.arrowsDown}`} onClick={()=>{
                        dispatch(actionsForStateOfMyPackSortDate.setSortValue('1cardsCount'))
                        dispatch(actionsForStateOfMyPackSortDate.setFlagData(true))
                     }}></div>
                  </div>
               </th>
               <th className={s.col3}>Last Updated
                  <div className={s.containerArrows}>
                     <div className={`${s.arrows} ${s.arrowsUp}`} onClick={()=>{
                        dispatch(actionsForStateOfMyPackSortDate.setSortValue('0updated'))
                        dispatch(actionsForStateOfMyPackSortDate.setFlagData(true))
                     }}></div>
                     <div className={`${s.arrows} ${s.arrowsDown}`} onClick={()=>{
                        dispatch(actionsForStateOfMyPackSortDate.setSortValue('1updated'))
                        dispatch(actionsForStateOfMyPackSortDate.setFlagData(true))
                     }}></div>
                  </div>
               </th>
               <th className={s.col4}>Created by</th>
               <th className={s.col5}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
               pack.map(t =>
                  <tr key={t._id}>
                     <th className={s.col1}>{t.name}</th>
                     <th className={s.col2}>{t.cardsCount}</th>
                     <th className={s.col3}>{(t.updated.slice(0, 10))}</th>
                     <th className={s.col4}>{t.user_name}</th>
                     <th className={`${s.col5} ${s.btn}`}>
                        {me === t.user_id && <>
                           <Button
                              rounded={false}
                              color='red'
                              onClick={() => deleteOpenModal(t._id, t.name)}
                           >Delete</Button>
                           <Button
                              rounded={false}
                              color='light-blue'
                              onClick={() => openEditModalHandler(t._id, t.name)}
                           >Edit</Button>
                        </>
                        }
                        <Link to={`/card/${t._id}`}><Button rounded={false} color='light-blue'>Learn</Button></Link>
                     </th>
                     <th>
                     </th>
                  </tr>
               )
            }
            </tbody>
         </table>
         <Modal modalActive={editModalActive} setModalActive={setEditModalActive}>
            <div className={s.table__modal}>
               <h2>Edit Pack {editOrDeleteValue.name}</h2>
               <hr/>
               <InputField
                  label='New name'
                  value={editPackName}
                  onChange={e => setEditPackName(e.currentTarget.value)}
               />
               <div className={global.modal__btn}>
                  <Button
                     width={120}
                     rounded
                     color='light-blue'
                     onClick={cancelEditModalHandler}
                  >Cancel</Button>
                  <Button
                     onClick={saveEditPackHandler}
                     width={120}
                     rounded
                     color='dark-blue'
                  >Save</Button>
               </div>
            </div>
         </Modal>
         <Modal modalActive={deleteModalActive} setModalActive={setDeleteModalActive}>
            <div className={s.table__modal}>
               <h2>Delete Pack</h2>
               <hr/>
               <p>Do you really want to remove <b>{deletePackId.name}</b>?</p>
               <p>All cards will be excluded from this course.</p>
               <div className={global.modal__btn}>
                  <Button
                     width={120}
                     rounded
                     color='light-blue'
                     onClick={() => setDeleteModalActive(false)}
                  >Cancel</Button>
                  <Button
                     onClick={deletePackHandler}
                     width={120}
                     rounded
                     color='red'
                  >Delete</Button>
               </div>
            </div>
         </Modal>
      </div>
   )
}
