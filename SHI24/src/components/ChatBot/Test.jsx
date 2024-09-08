import React from 'react'
import OpenAI from "openai";

function Test() {

    const openai = new OpenAI();

    const completion = openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Write a haiku about recursion in programming.",
            },
        ],
    });

    console.log(completion.choices[0].message);

    return (
        <div>
            <H1>Testing Api calls directly from gpt</H1>
        </div>
    )
}

export default Test
