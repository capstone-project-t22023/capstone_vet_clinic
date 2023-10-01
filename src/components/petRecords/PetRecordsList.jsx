import React, {useContext, useEffect, useState} from "react";
import dayjs from "dayjs";
import {PetsContext} from "../../contexts/PetsProvider";
import {
    Table,
    TableRow,
    Paper,
    TableBody,
    TableContainer,
    TableHead,
    Typography,
    Stack,
    Box,
    Tabs, Tab,
} from "@mui/material";
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {TabPanel} from "@mui/lab";
import Loading from "../Loading";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        // borderBottom: "1px solid",
        // borderColor:  theme.palette.primary[100],
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.primary[50],
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function PetRecordsList() {

    const [petRehabList, setPetRehabList] = useState([]);
    const [petSurgeryList, setPetSurgeryList] = useState([]);
    const [petDietList, setPetDietList] = useState([]);
    const [petImmunList, setPetImmunList] = useState([]);
    const {selectedPet} = useContext(PetsContext);
    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchPetRecordsById = (petId, tab) => {
        let apiUrl = '';
        switch (tab) {
            case 0:
                apiUrl = `http://localhost/capstone_vet_clinic/api.php/get_all_rehab_record_by_pet/${petId}`;
                break;
            case 1:
                apiUrl = `http://localhost/capstone_vet_clinic/api.php/get_all_diet_record_by_pet/${petId}`;
                break;
            case 2:
                apiUrl = `http://localhost/capstone_vet_clinic/api.php/get_all_surgery_record_by_pet/${petId}`;
                break;
            case 3:
                apiUrl = `http://localhost/capstone_vet_clinic/api.php/get_immun_record/${petId}`;
                break;
            default:
                return Promise.reject(new Error("Invalid type"));
        }

        return fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (tab === 0) setPetRehabList(data.rehab_record);
                else if (tab === 1) setPetDietList(data.diet_record);
                else if (tab === 2) setPetSurgeryList(data.surgery_record);
                else if (tab === 3) setPetImmunList(data.vaccine_record);
                return data; // Return the fetched data
            })
            .catch((error) => {
                console.error('Error fetching records:', error);
                throw error; // Propagate the error
            });
    };

    useEffect(() => {
        if (selectedPet) {
            setLoading(true); // Set loading to true when starting the fetch

            // Fetch records for the selected pet based on the type (e.g., rehab, surgery, diet, immun)
            fetchPetRecordsById(selectedPet, selectedTab)
                .then((rehabData) => {
                    // You can set other state variables here as needed
                })
                .catch((error) => {
                    console.error('Error fetching rehab records:', error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false); // Set loading to false after 1 second
                    }, 500);
                });
        }
    }, [selectedPet, selectedTab]);


    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
        setSelectedTabVertical(0);
    };

    // TODO all other pet records

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
            >
                <Box p={3}>{children}</Box>
            </Typography>
        );
    }

    const [selectedTabVertical, setSelectedTabVertical] = useState(0);

    const handleChangeTabVertical = (event, newValue) => {
        setSelectedTabVertical(newValue);
    };


    return (
        <Stack direction="column" sx={{width: "100%"}}>
            <Tabs
                value={selectedTab}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Rehab Records"/>
                <Tab label="Diet Records"/>
                <Tab label="Surgery Records"/>
                <Tab label="Immunization Records"/>
            </Tabs>
            <TabPanel value={selectedTab} index={0}>
                {petRehabList && !loading ? (
                    <Paper elevation={3}>
                        <Box
                            sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
                        >

                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={selectedTabVertical}
                                onChange={handleChangeTabVertical}
                                aria-label="Vertical tabs example"
                                sx={{borderRight: 1, borderColor: 'divider'}}
                            >
                                {petRehabList.map((record, index) => (
                                    <Tab key={index}
                                         label={dayjs(record.referral_date).format("DD MMM YYYY")}/>
                                ))}
                            </Tabs>
                            {petRehabList.map((record, index) => (
                                <TabPanel role="tabpanel"
                                          key={index}
                                          hidden={selectedTabVertical !== index}
                                          id={`vertical-tabpanel-${index}`}
                                          aria-labelledby={`vertical-tab-${index}`}>
                                    <Box sx={{p: 3}}>
                                        <Typography fontWeight="bold" component="h3" variant="h6">{record.diagnosis}</Typography>
                                        <Table>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Treatment Date</StyledTableCell>
                                                    <StyledTableCell>Attended</StyledTableCell>
                                                    <StyledTableCell>Comments</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {record.rehab_records.map((rehabRecord, idx) => (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{rehabRecord.treatment_date}</StyledTableCell>
                                                        <StyledTableCell>{rehabRecord.attended}</StyledTableCell>
                                                        <StyledTableCell>{rehabRecord.comments}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </TabPanel>
                            ))}


                        </Box>
                    </Paper>
                ) : (
                    <Loading open={loading}/>
                )}
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                {petDietList && !loading ? (

                        <Paper elevation={3}>
                            <Box
                                sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
                            >

                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={selectedTabVertical}
                                    onChange={handleChangeTabVertical}
                                    aria-label="Vertical tabs example"
                                    sx={{borderRight: 1, borderColor: 'divider'}}
                                >
                                    {petDietList.map((record, index) => (
                                        <Tab key={index}
                                             label={dayjs(record.prescription_date).format("DD MMM YYYY")} />
                                    ))}
                                </Tabs>
                                {petDietList.map((record, index) => (
                                    <TabPanel role="tabpanel"
                                              key={index}
                                              hidden={selectedTabVertical !== index}
                                              id={`vertical-tabpanel-${index}`}
                                              aria-labelledby={`vertical-tab-${index}`}>
                                        <Box sx={{p: 3}}>
                                            <Typography fontWeight="bold" component="h3" variant="h6">{record.veterinarian}</Typography>
                                            <Table>
                                                <TableHead>
                                                    <StyledTableRow>
                                                        <StyledTableCell>Product</StyledTableCell>
                                                        <StyledTableCell>Serving Portion</StyledTableCell>
                                                        <StyledTableCell>Morning</StyledTableCell>
                                                        <StyledTableCell>Evening</StyledTableCell>
                                                        <StyledTableCell>Comments</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {record.diet_records.map((dietRecord, idx) => (
                                                        <StyledTableRow key={idx}>
                                                            <StyledTableCell>{dietRecord.product}</StyledTableCell>
                                                            <StyledTableCell>{dietRecord.serving_portion}</StyledTableCell>
                                                            <StyledTableCell>{dietRecord.morning}</StyledTableCell>
                                                            <StyledTableCell>{dietRecord.evening}</StyledTableCell>
                                                            <StyledTableCell>{dietRecord.comments || 'N/A'}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </TabPanel>
                                ))}


                            </Box>

                    </Paper>
                ) : (
                    <Loading open={loading}/>
                )}
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
                {petSurgeryList && !loading ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Surgery Date</StyledTableCell>
                                    <StyledTableCell>Surgery Type</StyledTableCell>
                                    <StyledTableCell>Veterinarian</StyledTableCell>
                                    <StyledTableCell>Comments</StyledTableCell>
                                    <StyledTableCell>Discharge Date</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {petSurgeryList.map((record, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{record.surgery_date}</StyledTableCell>
                                        <StyledTableCell>{record.surgery}</StyledTableCell>
                                        <StyledTableCell>{record.veterinarian}</StyledTableCell>
                                        <StyledTableCell>{record.comments || 'N/A'}</StyledTableCell>
                                        <StyledTableCell>{record.discharge_date}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Loading open={loading}/>
                )}
            </TabPanel>
            <TabPanel value={selectedTab} index={3}>
                {petImmunList && !loading ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Vaccine Date</StyledTableCell>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell>Vaccine</StyledTableCell>
                                    <StyledTableCell>Comments</StyledTableCell>
                                    {/*<StyledTableCell>Doctor ID</StyledTableCell>*/}
                                    <StyledTableCell>Veterinarian</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {petImmunList.map((item, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{dayjs(item.vaccine_date).format("DD MMM YYYY")}</StyledTableCell>
                                        <StyledTableCell>{item.record_id}</StyledTableCell>
                                        <StyledTableCell>{item.vaccine}</StyledTableCell>
                                        <StyledTableCell>{item.comments}</StyledTableCell>
                                        {/*<StyledTableCell>{item.doctor_id}</StyledTableCell>*/}
                                        <StyledTableCell>{item.veterinarian}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Loading open={loading}/>
                )}
            </TabPanel>

        </Stack>
    )

}