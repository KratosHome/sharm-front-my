"use client";
import {Children, cloneElement, FC, isValidElement, ReactNode, useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import useHttp from "@/actions/useHttp";
import TreeList from "@/components/admin/TreeList/TreeList";
import MyModal from "@/components/UI/MyModal/MyModal";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import "./WrapperTreeList.scss";
import SpinnerFullScreen2 from "@/components/UI/Spinner/SpinnerFullScreen2";

interface WrapperProps {
    data: any;
    type: string;
    children: ReactNode;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const WrapperTreeList: FC<WrapperProps> = ({data, type, children}) => {
    const router = useRouter();
    const t = useTranslations("Menu");
    const {request, loading, error, clearError} = useHttp();

    const [selectedToEditItem, setSelectedToEditItem] = useState<any>(null);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

    const handleEditClick = useCallback(
        (item: any) => {
            setSelectedToEditItem(item);
        },
        [setSelectedToEditItem],
    );

    const handleAddClick = useCallback(
        (item: any) => {
            setSelectedToEditItem(false)
        },
        [setSelectedToEditItem],
    );

    const moveItem = useCallback(
        (dragId: string, hoverId: string) => {
            if (dragId === hoverId || dragId === data[0]?.id) {
                return;
            }
            const moveData = {
                nodeId: dragId,
                parentId: hoverId,
            };

            const endpoint = type === "category" ? "categories" : type;
            const requestURL = `${baseURL}/api/${endpoint}/move`;

            request({
                url: requestURL,
                method: "PATCH",
                body: JSON.stringify(moveData),
            })
                .then(() => router.refresh())
                .catch((e) => {
                    setConfirmationModalVisible(true);
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data],
    );

    const handleCloseConfirmation = (res: boolean = false) => {
        clearError();
        setConfirmationModalVisible(res);
    };


    return (
        <div className="container-wrapper">
            {data.length === 0 ? <h3>{t("nothing_here")}</h3> : null}
            <div className="wrapper-tree">
                <div className="container-tree-list">
                    <DndProvider backend={HTML5Backend}>
                        {data.map((item: any) => (
                            <TreeList
                                key={item.id}
                                data={item}
                                isRootElement={true}
                                onEditClick={handleEditClick}
                                onAddClick={handleAddClick}
                                onMoveItem={moveItem}
                                type={type}
                            />
                        ))}
                    </DndProvider>
                </div>

                {selectedToEditItem &&
                    Children.map(children, (child) => {
                        if (isValidElement(child)) {
                            return cloneElement(child, {
                                parentId: data[0].id,
                                [type]: selectedToEditItem,
                                setVisible: setSelectedToEditItem,
                            } as any);
                        }
                        return null;
                    })}

                {confirmationModalVisible && <MyModal
                    visible={confirmationModalVisible}
                    setVisible={handleCloseConfirmation}
                    positionStyle={{justifyContent: "center", alignItems: "center"}}
                >
                    <div className="menu-item-confirmation">
                        <p>{error}</p>
                        <div className="menu-item-actions">
                            <MyBtn
                                text={t("close")}
                                color="attention"
                                click={() => handleCloseConfirmation()}
                            />
                        </div>
                    </div>
                </MyModal>}
                {loading && <SpinnerFullScreen2/>}
            </div>
        </div>
    );
};

export default WrapperTreeList;
