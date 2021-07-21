import React, { useEffect } from "react";
import { EasybaseProvider, useEasybase } from 'easybase-react';
import ebconfig from "../ebconfig";

function Database() {
    return (
        <div className="App" style={{ display: "flex", justifyContent: "center" }}>
            <EasybaseProvider ebconfig={ebconfig}>
                <CaseRecords />

                <NewCaseRecordButton />
            </EasybaseProvider>
        </div>
    );
}

// Component of case record display
function CaseRecords() {
    const { Frame, sync, configureFrame } = useEasybase();

    useEffect(() => {
        configureFrame({ tableName: "MY-COVID-CASES", limit: 10 });
        sync();
    }, []);

    const noteRootStyle = {
        border: "2px #0af solid",
        borderRadius: 9,
        margin: 20,
        backgroundColor: "#efefef",
        padding: 6
    };

    return (
        <div style={{ width: 400 }}>
            {Frame().map(ele =>
                <div style={noteRootStyle}>
                    <h3>LastUpdated: {ele.lastupdated}</h3>
                    <p>totalcases: {ele.totalcases}</p>
                    <p>dailycases: {ele.dailycases}</p>
                    <p>totalrecovered: {ele.totalrecovered}</p>
                    <p>dailyrecovered: {ele.dailyrecovered}</p>
                    <p>totalactivecases: {ele.totalactivecases}</p>
                    <p>dailyactivecases: {ele.dailyactivecases}</p>
                    <p>totaldeath: {ele.totaldeath}</p>
                    <p>dailydeath: {ele.dailydeath}</p>
                </div>
            )}
        </div>
    )
}

function NewCaseRecordButton() {
    const { Frame, sync } = useEasybase();

    const buttonStyle = {
        fontSize: 12,
        opacity: 0,
    }

    const handleClick = () => {
        const newTotalCases = prompt("Please enter newTotalCases");
        const newDailyCases = prompt("Please enter newDailyCases");
        const newTotalRecovered = prompt("Please enter newTotalRecovered");
        const newDailyRecovered = prompt("Please enter newDailyRecovered");
        const newTotalActiveCases = prompt("Please enter newTotalActiveCases");
        const newDailyActiveCases = prompt("Please enter newDailyActiveCases");
        const newTotalDeath = prompt("Please enter newTotalDeath");
        const newDailyDeath = prompt("Please enter newDailyDeath");
        const newLastUpdated = prompt("Please enter newLastUpdated");

        Frame().push({
            totalcases: newTotalCases,
            dailycases: newDailyCases,
            totalrecovered: newTotalRecovered,
            dailyrecovered: newDailyRecovered,
            totalactivecases: newTotalActiveCases,
            dailyactivecases: newDailyActiveCases,
            totaldeath: newTotalDeath,
            dailydeath: newDailyDeath,
            lastupdated: newLastUpdated,
        })

        sync();
    }

    return <button style={buttonStyle} onClick={handleClick} disabled>📓 Add Note 📓</button>
}

export default Database;