export declare global{
    namespace ReactNavigation{
        interface RootParamList{
            home: undefined;
            meal: {
                date: string;
                name: string;
                description: string;
                hour: string;
                isOnDiet: boolean;
            };
            dietdata: undefined;
            registernewmeal: undefined;
            registermealconclusion: {isMealOnDiet : boolean};
            editmeal: {
                date: string;
                name: string;
                description: string;
                hour: string;
                isOnDiet: boolean;
            }
        }
    }
}