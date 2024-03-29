"use client";
import React, { FC, useRef, useState } from "react";
import "./TreeList.scss";
import { useDrag, useDrop } from "react-dnd";
import MyModal from "@/components/UI/MyModal/MyModal";
import CreateMenu from "../CreateMenu/CreateMenu";
import CreateCategory from "../CreateCategory/CreateCategory";
import { ModalComponents } from "../Wrapper/WrapperTreeList";

type TreeListProps = {
  data: any;
  onFolderClick: (item: any) => void;
  onMoveItem: (dragId: string, hoverId: string) => void;
  type: string;
};

const TreeList: FC<TreeListProps> = ({
  data,
  onFolderClick,
  onMoveItem,
  type,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleClick = () => {
    onFolderClick(data);
  };

  const ItemType = "TREE_ITEM";
  const [_, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: data.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop(
    {
      accept: ItemType,
      hover(item: { id: string }, monitor) {
        if (!monitor.isOver()) {
          return;
        }
        if (item.id !== data.id) {
          setIsOpen(true);
        }
      },
      drop(item: { id: string }, monitor) {
        if (!monitor.didDrop() && item.id !== data.id) {
          onMoveItem(item.id, data.id);
          setIsOpen(true);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    },
    [data.id]
  );

  drag(drop(ref));
  const modalComponents: ModalComponents = {
    menu: <CreateMenu parentId={data.id || null} setVisible={setOpenModal} />,
    category: (
      <CreateCategory parentId={data.id || null} setVisible={setOpenModal} />
    ),
  };

  const modalComponent = modalComponents[type] || null;
  const handleAddChildrenClick = () => {
    setOpenModal(!openModal);
  };
  return (
    <div>
      <div ref={ref} className={`wrapper-tree-list ${isOver ? "hovered" : ""}`}>
        <div className="wrapper-resuly-tree-list">
          {data.children.length > 0 ? (
            <div className="open-tree" onClick={toggle}>
              {isOpen ? "[-]" : "[+]"}
            </div>
          ) : null}
          <div className="name-tree" onClick={handleClick}>
            {data.translations &&
              data.translations.length > 0 &&
              data.translations[0].name}
          </div>
          <button
            className="add-children-btn"
            onClick={() => handleAddChildrenClick()}>
            Add
          </button>
        </div>
        {isOpen && data.children && (
          <div className="tree-children">
            {data.children.map((child: any) => (
              <TreeList
                key={child.id}
                data={child}
                onFolderClick={onFolderClick}
                onMoveItem={onMoveItem}
                type={type}
              />
            ))}
          </div>
        )}
      </div>
      <MyModal visible={openModal} setVisible={setOpenModal}>
        {modalComponent}
      </MyModal>
    </div>
  );
};

export default TreeList;
