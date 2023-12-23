export interface IFileModel {
    Name: string,
    FileNo: number,
    Size: number,
    Type: string,
    LastModified: string,
    Childs: Array<IFileModel>,
}