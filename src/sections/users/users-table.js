import { format } from 'date-fns';
import {
    Box,
    Button,
    Card,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useRouter } from 'next/router';

export const UsersTable = ({
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    editPath = null
}) => {
    const router = useRouter();

    return (
        <Card>
            <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Nome
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                {/* <TableCell>
                                    Cargo
                                </TableCell> */}
                                {/* <TableCell>
                                    Data de entrada
                                  </TableCell>*/}
                                <TableCell>
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((customer) => {
                                // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');
                                return (
                                    <TableRow
                                        hover
                                        key={customer.id}
                                    >
                                        <TableCell>
                                            {customer.name}
                                        </TableCell>
                                        <TableCell>
                                            {customer.email}
                                        </TableCell>
                                        {/* <TableCell>
                                            {customer.cargo.replace("MANAGER", "Gestor").replace("TEACHER", "Professor")}
                                        </TableCell> */}
                                        {/* <TableCell>
                                            {createdAt}
                                        </TableCell> */}
                                        <TableCell>
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() => {
                                                    router.push(editPath ?? router.reload)
                                                }}
                                            >
                                                <ModeEditOutlineOutlinedIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete">
                                                <DeleteOutlinedIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};
