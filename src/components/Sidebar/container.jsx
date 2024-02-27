import { useState } from "react";
import { useGetBoardsQuery } from "../../redux/services/boards";
import { SideBarComponent } from "./component";

export const SideBarContainer = ({ open }) => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const { data: boards, isLoading, isFetching } = useGetBoardsQuery();

  return (
    <SideBarComponent
      open={open}
      selectedBoard={selectedBoard}
      setSelectedBoard={setSelectedBoard}
      boards={boards}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};
