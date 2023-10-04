interface ContentProps {
  content: string[]; // Assuming content is an array of strings
}

export default function Content(props: ContentProps) {
  return <>
        <ul>
            {props.content.map(item => <li>{item}</li>)} 
        </ul>
    </>;
}
