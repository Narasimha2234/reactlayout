import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  IconButton,
  TableSortLabel,
  Toolbar,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Sample data
const initialRows = [
  { id: 1, name: 'John', age: 35, role: 'Manager', status: 'Active' },
  { id: 2, name: 'Anna', age: 28, role: 'Developer', status: 'Active' },
  { id: 3, name: 'Mike', age: 42, role: 'Analyst', status: 'Inactive' },
  { id: 4, name: 'Sara', age: 30, role: 'Designer', status: 'Active' },
  { id: 5, name: 'Liam', age: 38, role: 'QA', status: 'Inactive' },
  { id: 6, name: 'Lucas', age: 29, role: 'Product Manager', status: 'Active' },
  { id: 7, name: 'John', age: 35, role: 'Manager', status: 'Active' },
  { id: 8, name: 'Anna', age: 28, role: 'Developer', status: 'Active' },
  { id: 9, name: 'Mike', age: 42, role: 'Analyst', status: 'Inactive' },
  { id: 41, name: 'Sara', age: 30, role: 'Designer', status: 'Active' },
  { id: 52, name: 'Liam', age: 38, role: 'QA', status: 'Inactive' },
  { id: 63, name: 'Lucas', age: 29, role: 'Product Manager', status: 'Active' },
];

const TableWithFeatures = () => {
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter rows based on search input
  const filteredRows = initialRows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.role.toLowerCase().includes(searchText.toLowerCase()) ||
      row.status.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle Sorting
  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortBy) {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Paginate rows
  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Handle Search
  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setPage(0); // Reset to first page when filtering
  };

  const handleClearSearch = () => {
    setSearchText('');
    setPage(0);
  };

  // Handle Sorting
  const handleSort = (column) => {
    const isAsc = sortBy === column && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(column);
  };

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Paper sx={{ mb: 2 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Members Table</Typography>
          <Box sx={{ display: 'flex' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <>
                    {searchText && (
                      <IconButton onClick={handleClearSearch}>
                        <ClearIcon />
                      </IconButton>
                    )}
                    <SearchIcon />
                  </>
                ),
              }}
            />
          </Box>
        </Toolbar>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'id'}
                    direction={sortOrder}
                    onClick={() => handleSort('id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'name'}
                    direction={sortOrder}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'age'}
                    direction={sortOrder}
                    onClick={() => handleSort('age')}
                  >
                    Age
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'role'}
                    direction={sortOrder}
                    onClick={() => handleSort('role')}
                  >
                    Role
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'status'}
                    direction={sortOrder}
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>
    </Box>
  );
};

export default TableWithFeatures;
