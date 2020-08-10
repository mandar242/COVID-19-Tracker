import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox( { title, cases, total } ) {
    return (
        <div>
            <Card>
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
        </div>
    )
}

export default InfoBox;
