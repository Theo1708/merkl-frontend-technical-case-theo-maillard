import { usePaginationStore } from "~/state/paginationState"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Button, Container, Text, Select } from "dappkit";

const POSSIBLE_ITEMS_PER_PAGE = [5, 10, 20, 50, 100];

export default function Paginator() {

    const { pagination, previousPage, nextPage, setItemsPerPage } = usePaginationStore();

    const itemsPerPageOptions = POSSIBLE_ITEMS_PER_PAGE.reduce((acc, item) => {
        acc[item] = (
            <div className="flex items-center gap-xl">
                {item}
            </div>
        );
        return acc;
    }, {} as any);

    const handleItemsPerPageChange = (newItemsPerPage: any) => {
        setItemsPerPage(newItemsPerPage);
    }

    return (
        <Container className="flex flex-row justify-end gap-lg items-center">
            <Button
                className="w-[50px]"
                center={true}
                look={"base"}
                onClick={() => previousPage()}
            >
                <AiOutlineArrowLeft size={15} />
            </Button>

            <Text>
                {pagination.currentPage} / {pagination.totalPages}
            </Text>
            <Button
                className="w-[50px]"
                center={true}
                look={"base"}
                onClick={() => nextPage()}
            >
                <AiOutlineArrowRight size={15} />
            </Button>

            <Select
                value={pagination.itemsPerPage as any}
                onChange={handleItemsPerPageChange}
                options={itemsPerPageOptions}
                placeholder="Items per page"
            />
        </Container>
    )
}