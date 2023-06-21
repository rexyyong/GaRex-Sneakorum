import React, { useEffect, useState, useContext } from 'react'

import { useParams } from 'react-router-dom';

//mui
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';

import GarexNavbar from '../components/GarexNavbar';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import ReplyThreadForm from '../components/ReplyThreadForm';
import './ForumHome.css'

const Thread = () => {
    // extract thread id
    let params = useParams()
    let threadID = params.id

    // initalize thread and posts component state
    let [thread, setThread] = useState(null)

    // trigger thread update
    useEffect(() => {
        let getThread = async () => {
            let response = await fetch(`/api/threads/${threadID}`)
            let data = await response.json()
            setThread(data)

        }

        getThread()
    }, [threadID])

    return (
        <div className="vh-100 gradient-custom">
            <GarexSneakorumLogo />
            <GarexNavbar />

            <div style={{ marginTop: 100 }}>
                <Container>
                    <Card sx={{ minWidth: 300, marginTop: 3 }} elevation={3}>
                        <CardContent>
                            <Grid container justifyContent="space-between">
                                <Typography sx={{ m: 1, p: 1 }} variant="h6" component="div">
                                    {thread?.subject}

                                </Typography>

                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            </Grid>

                            <Typography style={{ whiteSpace: 'pre-line' }} sx={{ m: 1, p: 1 }} variant="body1">
                                {thread?.content}
                            </Typography>

                        </CardContent>

                        <CardActions sx={{ marginBottom: 2, marginRight: 3 }}>
                            <Grid container justifyContent="flex-end">

                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </Grid>
                        </CardActions>
                    </Card>

                </Container>

                <ReplyThreadForm />

            </div>
        </div>
    )

}

export default Thread