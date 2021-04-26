import { CouchDb} from './configuration.model';

export let couchDbUrl="dev-cd.dosepack.com/";
export let system="config-db-17";
export let centralCouchdbHttpMode = "https://";

export const CouchDbConfig: CouchDb = {
    couchDbUrl: `${centralCouchdbHttpMode}${couchDbUrl}`,
    system:`${system}`,
}