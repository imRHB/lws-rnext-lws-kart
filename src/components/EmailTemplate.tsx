interface EmailTemplateProps {
    firstName: string;
}

export default function EmailTemplate({ message }: { message: string }) {
    return <div>{message}</div>;
}
