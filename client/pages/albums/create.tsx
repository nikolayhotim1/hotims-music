import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import { GeneralInfo, SetPicture } from '../../components/create-album-steps';

const create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture]: any = useState();
    const [globImage, setGlobImage] = useState();
    const name = useInput('');
    const author = useInput('');
    const router = useRouter();

    const next = () => {
        if (activeStep < 1) {
            setActiveStep(prev => prev + 1);
        } else {
            const formData = new FormData()
            formData.append('name', name.value);
            formData.append('author', author.value);
            formData.append('picture', picture);
            axios.post('http://localhost:5000/albums', formData)
                .catch(e => console.log(e))
                .finally(() => router.push('/albums'))
        }
    };

    const back = () => {
        setActiveStep(prev => prev - 1);
    };

    return (
        <MainLayout>
            <StepWrapper
                activeStep={activeStep}
                steps={['Album info', 'Upload cover']}
            >
                {activeStep === 0 &&
                    <GeneralInfo
                        name={name}
                        author={author}
                    />
                }
                {activeStep === 1 &&
                    <SetPicture
                        picture={picture}
                        setPicture={setPicture}
                        setGlobImage={setGlobImage}
                    />
                }
            </StepWrapper>
            <Grid
                container
                justifyContent='space-between'
            >
                <Button
                    disabled={activeStep === 0}
                    onClick={back}
                >
                    Back
                </Button>
                <Button onClick={next}>
                    Next
                </Button>
            </Grid>
        </MainLayout>
    );
};

export default create;

// import { Button, Grid, TextField } from '@mui/material';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import React, { useState } from 'react';
// import styles from './styles/Create.module.scss';
// import imageHolder from '../../assets/imageHolder.png';
// import StepWrapper from '../../components/StepWrapper';
// import { useInput } from '../../hooks/useInput';
// import FileUpload from '../../components/FileUpload';
// import MainLayout from '../../layouts/MainLayout';

// const CreateAlbum = () => {
// 	const [activeStep, setActiveStep] = useState(0);
// 	const [picture, setPicture]: any = useState(null);
// 	const [globImage, setGlobImage]: any = useState(null);
// 	const name = useInput('');
// 	const author = useInput('');
// 	const router = useRouter();

// 	const next = () => {
// 		if (activeStep !== 1) {
// 			setActiveStep(prev => prev + 1);
// 		} else {
// 			const formData = new FormData();
// 			formData.append('name', name.value);
// 			formData.append('author', author.value);
// 			formData.append('picture', picture);

// 			axios
// 				.post('http://localhost:5000/albums', formData)
// 				.then(() => router.push('/albums'))
// 				.catch(e => console.log(e));
// 		}
// 	};
// 	const back = () => setActiveStep(prev => prev - 1);

// 	return (
// 		<MainLayout>
// 			<StepWrapper
// 				activeStep={activeStep}
// 				steps={['Album Information', 'Cover Upload']}
// 			>
// 				{activeStep === 0 && (
// 					<Grid container direction={'column'} style={{ padding: 20 }}>
// 						<TextField
// 							{...name}
// 							style={{ marginTop: 10 }}
// 							label={'Album name'}
// 						/>
// 						<TextField
// 							{...author}
// 							style={{ marginTop: 10 }}
// 							label={'Author name'}
// 						/>
// 					</Grid>
// 				)}
// 				{activeStep === 1 && (
// 					<FileUpload
// 						setFile={setPicture}
// 						setGlobImage={setGlobImage}
// 						accept='image/*'
// 					>
// 						<div className={styles.container}>
// 							<h3 className={styles.heading}>Click to add your cover</h3>
// 							<div className={styles.imgHolder}>
// 								<img
// 									src={picture ? globImage : imageHolder}
// 									className={styles.img}
// 									alt='img'
// 								/>
// 							</div>
// 						</div>
// 					</FileUpload>
// 				)}
// 			</StepWrapper>
// 			<Grid container justifyContent='space-between'>
// 				<Button disabled={activeStep === 0} onClick={back}>
// 					Back
// 				</Button>
// 				<Button onClick={next}>Next</Button>
// 			</Grid>
// 		</MainLayout>
// 	);
// };

// export default CreateAlbum;