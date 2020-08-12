import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox( { title, cases, active, total, ...props } ) {
    return (
            <Card onClick ={props.onClick} className = {`infoBox ${active && 'infoBox--selected'}`}>
                <CardContent>

                    {/* Title */}
                    <Typography className = "infobox__title" color = "textSecondary">
                        {title}
                    </Typography>

                    {/* Number of Cases */}
                    <h2 className = "infobox__cases"> { cases } </h2>

                    {/* Total Cases */}
                    <Typography className = "infobox__total" color = "textSecondary">
                        { total } Total
                    </Typography>

                </CardContent>
            </Card>
    )
}

export default InfoBox;
