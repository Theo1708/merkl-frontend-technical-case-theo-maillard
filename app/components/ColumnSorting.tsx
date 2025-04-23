import { Button, Container, Text } from "dappkit";

import { useColumnSortingStore } from "~/state/columnSortingState";
import { AiOutlineClose,  AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

const POSSIBLE_COLUMN_SORTING = ["APR", "TVL"];

export default function ColumnSorting() {

    const selectedColumn = useColumnSortingStore((state) => state.selectedColumn);
    const setSelectedColumn = useColumnSortingStore((state) => state.setSelectedColumn);

    const selectedOrder = useColumnSortingStore((state) => state.selectedOrder);
    const setSelectedOrder = useColumnSortingStore((state) => state.setSelectedOrder);

    return (
        <Container>
            <Text>
                Sorting
            </Text>
            <div className="flex flex-row gap-lg">
                {POSSIBLE_COLUMN_SORTING.map((token) => (
                    <Button
                        className="w-[100px]"
                        center={true}
                        key={token}
                        look={selectedColumn === token ? "bold" : "base"}
                        onClick={() => setSelectedColumn(token)}
                    >
                    {token}
                    </Button>
                ))}
                <Button
                    className="w-[50px]"
                    center={true}
                    look={selectedColumn === null ? "bold" : "base"}
                    onClick={() => setSelectedColumn(null)}
                    >
                    <AiOutlineClose size={15} />
                </Button>
                {selectedColumn !== null && (
                    <Button
                        className="w-[50px]"
                        center={true}
                        look="bold"
                        onClick={() => setSelectedOrder(selectedOrder === "asc" ? "desc" : "asc")}
                    >
                        {selectedOrder === "asc" ? (
                            <AiOutlineArrowDown size={15}/>
                        ) : (
                            <AiOutlineArrowUp size={15}/>
                        )}
                    </Button>
                )}
            </div>
        </Container>
    )
}