module.exports = (sequelize, DataTypes) => {
    const scfp2019 = sequelize.define('scfp2019', {
        Y1: {
          type: DataTypes.INTEGER,
        },
        WGT: {
          type: DataTypes.DOUBLE,
        },
        HHSEX: {
          type: DataTypes.INTEGER,
        },
        AGE: {
          type: DataTypes.INTEGER,
        },
        AGECL: {
          type: DataTypes.INTEGER,
        },
        EDUC: {
          type: DataTypes.INTEGER,
        },
        EDCL: {
          type: DataTypes.INTEGER,
        },
        MARRIED: {
          type: DataTypes.INTEGER,
        },
        KIDS: {
          type: DataTypes.INTEGER,
        },
        LF: {
          type: DataTypes.INTEGER,
        },
        LIFECL: {
          type: DataTypes.INTEGER,
        },
        FAMSTRUCT: {
          type: DataTypes.INTEGER,
        },
        RACECL: {
          type: DataTypes.INTEGER,
        },
        RACECL4: {
          type: DataTypes.INTEGER,
        },
        RACE: {
          type: DataTypes.INTEGER,
        },
        OCCAT1: {
          type: DataTypes.INTEGER,
        },
        OCCAT2: {
          type: DataTypes.INTEGER,
        },
        INDCAT: {
          type: DataTypes.INTEGER,
        },
        FOODHOME: {
          type: DataTypes.INTEGER,
        },
        FOODAWAY: {
          type: DataTypes.INTEGER,
        },
        FOODDELV: {
          type: DataTypes.INTEGER,
        },
        RENT: {
          type: DataTypes.INTEGER,
        },
        INCOME: {
          type: DataTypes.DOUBLE,
        },
        WAGEINC: {
          type: DataTypes.DOUBLE,
        },
        BUSSEFARMINC: {
          type: DataTypes.INTEGER,
        },
        INTDIVINC: {
          type: DataTypes.DOUBLE,
        },
        KGINC: {
          type: DataTypes.DOUBLE,
        },
        SSRETINC: {
          type: DataTypes.DOUBLE,
        },
        TRANSFOTHINC: {
          type: DataTypes.INTEGER,
        },
        PENACCTWD: {
          type: DataTypes.INTEGER,
        },
        NORMINC: {
          type: DataTypes.DOUBLE,
        },
        WSAVED: {
          type: DataTypes.INTEGER,
        },
        SAVED: {
          type: DataTypes.INTEGER,
        },
        SAVRES1: {
          type: DataTypes.INTEGER,
        },
        SAVRES2: {
          type: DataTypes.INTEGER,
        },
        SAVRES3: {
          type: DataTypes.INTEGER,
        },
        SAVRES4: {
          type: DataTypes.INTEGER,
        },
        SAVRES5: {
          type: DataTypes.INTEGER,
        },
        SAVRES6: {
          type: DataTypes.INTEGER,
        },
        SAVRES7: {
          type: DataTypes.INTEGER,
        },
        SAVRES8: {
          type: DataTypes.INTEGER,
        },
        SAVRES9: {
          type: DataTypes.INTEGER,
        },
        SPENDMOR: {
          type: DataTypes.INTEGER,
        },
        SPENDLESS: {
          type: DataTypes.INTEGER,
        },
        EXPENSHILO: {
          type: DataTypes.INTEGER,
        },
        LATE: {
          type: DataTypes.INTEGER,
        },
        LATE60: {
          type: DataTypes.INTEGER,
        },
        HPAYDAY: {
          type: DataTypes.INTEGER,
        },
        BNKRUPLAST5: {
          type: DataTypes.INTEGER,
        },
        KNOWL: {
          type: DataTypes.INTEGER,
        },
        YESFINRISK: {
          type: DataTypes.INTEGER,
        },
        NOFINRISK: {
          type: DataTypes.INTEGER,
        },
        CRDAPP: {
          type: DataTypes.INTEGER,
        },
        TURNDOWN: {
          type: DataTypes.INTEGER,
        },
        FEARDENIAL: {
          type: DataTypes.INTEGER,
        },
        TURNFEAR: {
          type: DataTypes.INTEGER,
        },
        FORECLLAST5: {
          type: DataTypes.INTEGER,
        },
        EMERGBORR: {
          type: DataTypes.INTEGER,
        },
        EMERGSAV: {
          type: DataTypes.INTEGER,
        },
        EMERGPSTP: {
          type: DataTypes.INTEGER,
        },
        EMERGCUT: {
          type: DataTypes.INTEGER,
        },
        HBORRFF: {
          type: DataTypes.INTEGER,
        },
        HBORRCC: {
          type: DataTypes.INTEGER,
        },
        HBORRALT: {
          type: DataTypes.INTEGER,
        },
        HBORRFIN: {
          type: DataTypes.INTEGER,
        },
        HSAVFIN: {
          type: DataTypes.INTEGER,
        },
        HSAVNFIN: {
          type: DataTypes.INTEGER,
        },
        HPSTPPAY: {
          type: DataTypes.INTEGER,
        },
        HPSTPLN: {
          type: DataTypes.INTEGER,
        },
        HPSTPOTH: {
          type: DataTypes.INTEGER,
        },
        HCUTFOOD: {
          type: DataTypes.INTEGER,
        },
        HCUTENT: {
          type: DataTypes.INTEGER,
        },
        HCUTOTH: {
          type: DataTypes.INTEGER,
        },
        FINLIT: {
          type: DataTypes.INTEGER,
        },
        BSHOPNONE: {
          type: DataTypes.INTEGER,
        },
        BSHOPGRDL: {
          type: DataTypes.INTEGER,
        },
        BSHOPMODR: {
          type: DataTypes.INTEGER,
        },
        ISHOPNONE: {
          type: DataTypes.INTEGER,
        },
        ISHOPGRDL: {
          type: DataTypes.INTEGER,
        },
        ISHOPMODR: {
          type: DataTypes.INTEGER,
        },
        BCALL: {
          type: DataTypes.INTEGER,
        },
        BMAGZNEWS: {
          type: DataTypes.INTEGER,
        },
        BMAILADTV: {
          type: DataTypes.INTEGER,
        },
        BINTERNET: {
          type: DataTypes.INTEGER,
        },
        BFRIENDWORK: {
          type: DataTypes.INTEGER,
        },
        BFINPRO: {
          type: DataTypes.INTEGER,
        },
        BSELF: {
          type: DataTypes.INTEGER,
        },
        BDONT: {
          type: DataTypes.INTEGER,
        },
        BOTHER: {
          type: DataTypes.INTEGER,
        },
        ICALL: {
          type: DataTypes.INTEGER,
        },
        IMAGZNEWS: {
          type: DataTypes.INTEGER,
        },
        IMAILADTV: {
          type: DataTypes.INTEGER,
        },
        IINTERNET: {
          type: DataTypes.INTEGER,
        },
        IFRIENDWORK: {
          type: DataTypes.INTEGER,
        },
        IFINPRO: {
          type: DataTypes.INTEGER,
        },
        ISELF: {
          type: DataTypes.INTEGER,
        },
        IDONT: {
          type: DataTypes.INTEGER,
        },
        IOTHER: {
          type: DataTypes.INTEGER,
        },
        BFINPLAN: {
          type: DataTypes.INTEGER,
        },
        IFINPLAN: {
          type: DataTypes.INTEGER,
        },
        INTERNET: {
          type: DataTypes.INTEGER,
        },
        CHECKING: {
          type: DataTypes.INTEGER,
        },
        HCHECK: {
          type: DataTypes.INTEGER,
        },
        NOCHK: {
          type: DataTypes.INTEGER,
        },
        EHCHKG: {
          type: DataTypes.INTEGER,
        },
        WHYNOCKG: {
          type: DataTypes.INTEGER,
        },
        DONTWRIT: {
          type: DataTypes.INTEGER,
        },
        MINBAL: {
          type: DataTypes.INTEGER,
        },
        DONTLIKE: {
          type: DataTypes.INTEGER,
        },
        SVCCHG: {
          type: DataTypes.INTEGER,
        },
        CANTMANG: {
          type: DataTypes.INTEGER,
        },
        NOMONEY: {
          type: DataTypes.INTEGER,
        },
        CREDIT: {
          type: DataTypes.INTEGER,
        },
        DONTWANT: {
          type: DataTypes.INTEGER,
        },
        OTHER: {
          type: DataTypes.INTEGER,
        },
        CKLOCATION: {
          type: DataTypes.INTEGER,
        },
        CKLOWFEEBAL: {
          type: DataTypes.INTEGER,
        },
        CKMANYSVCS: {
          type: DataTypes.INTEGER,
        },
        CKRECOMFRND: {
          type: DataTypes.INTEGER,
        },
        CKPERSONAL: {
          type: DataTypes.INTEGER,
        },
        CKCONNECTN: {
          type: DataTypes.INTEGER,
        },
        CKLONGTIME: {
          type: DataTypes.INTEGER,
        },
        CKSAFETY: {
          type: DataTypes.INTEGER,
        },
        CKCONVPAYRL: {
          type: DataTypes.INTEGER,
        },
        CKOTHCHOOSE: {
          type: DataTypes.INTEGER,
        },
        PREPAID: {
          type: DataTypes.INTEGER,
        },
        SAVING: {
          type: DataTypes.INTEGER,
        },
        HSAVING: {
          type: DataTypes.INTEGER,
        },
        MMDA: {
          type: DataTypes.INTEGER,
        },
        MMMF: {
          type: DataTypes.INTEGER,
        },
        MMA: {
          type: DataTypes.INTEGER,
        },
        HMMA: {
          type: DataTypes.INTEGER,
        },
        CALL: {
          type: DataTypes.INTEGER,
        },
        HCALL: {
          type: DataTypes.INTEGER,
        },
        LIQ: {
          type: DataTypes.INTEGER,
        },
        HLIQ: {
          type: DataTypes.INTEGER,
        },
        CDS: {
          type: DataTypes.INTEGER,
        },
        HCDS: {
          type: DataTypes.INTEGER,
        },
        STMUTF: {
          type: DataTypes.INTEGER,
        },
        TFBMUTF: {
          type: DataTypes.INTEGER,
        },
        GBMUTF: {
          type: DataTypes.INTEGER,
        },
        OBMUTF: {
          type: DataTypes.INTEGER,
        },
        COMUTF: {
          type: DataTypes.INTEGER,
        },
        OMUTF: {
          type: DataTypes.INTEGER,
        },
        NMMF: {
          type: DataTypes.INTEGER,
        },
        HNMMF: {
          type: DataTypes.INTEGER,
        },
        STOCKS: {
          type: DataTypes.INTEGER,
        },
        HSTOCKS: {
          type: DataTypes.INTEGER,
        },
        NSTOCKS: {
          type: DataTypes.INTEGER,
        },
        WILSH: {
          type: DataTypes.INTEGER,
        },
        NOTXBND: {
          type: DataTypes.INTEGER,
        },
        MORTBND: {
          type: DataTypes.INTEGER,
        },
        GOVTBND: {
          type: DataTypes.INTEGER,
        },
        OBND: {
          type: DataTypes.INTEGER,
        },
        BOND: {
          type: DataTypes.INTEGER,
        },
        HBOND: {
          type: DataTypes.INTEGER,
        },
        IRAKH: {
          type: DataTypes.INTEGER,
        },
        THRIFT: {
          type: DataTypes.INTEGER,
        },
        FUTPEN: {
          type: DataTypes.INTEGER,
        },
        CURRPEN: {
          type: DataTypes.INTEGER,
        },
        RETQLIQ: {
          type: DataTypes.INTEGER,
        },
        HRETQLIQ: {
          type: DataTypes.INTEGER,
        },
        ANYPEN: {
          type: DataTypes.INTEGER,
        },
        DBPLANCJ: {
          type: DataTypes.INTEGER,
        },
        DCPLANCJ: {
          type: DataTypes.INTEGER,
        },
        DBPLANT: {
          type: DataTypes.INTEGER,
        },
        BPLANCJ: {
          type: DataTypes.INTEGER,
        },
        SAVBND: {
          type: DataTypes.INTEGER,
        },
        HSAVBND: {
          type: DataTypes.INTEGER,
        },
        CASHLI: {
          type: DataTypes.INTEGER,
        },
        HCASHLI: {
          type: DataTypes.INTEGER,
        },
        ANNUIT: {
          type: DataTypes.INTEGER,
        },
        TRUSTS: {
          type: DataTypes.INTEGER,
        },
        OTHMA: {
          type: DataTypes.INTEGER,
        },
        HOTHMA: {
          type: DataTypes.INTEGER,
        },
        OTHFIN: {
          type: DataTypes.INTEGER,
        },
        HOTHFIN: {
          type: DataTypes.INTEGER,
        },
        EQUITY: {
          type: DataTypes.INTEGER,
        },
        HEQUITY: {
          type: DataTypes.INTEGER,
        },
        DEQ: {
          type: DataTypes.INTEGER,
        },
        RETEQ: {
          type: DataTypes.INTEGER,
        },
        EQUITINC: {
          type: DataTypes.DOUBLE,
        },
        HBROK: {
          type: DataTypes.INTEGER,
        },
        HTRAD: {
          type: DataTypes.INTEGER,
        },
        NTRAD: {
          type: DataTypes.INTEGER,
        },
        FIN: {
          type: DataTypes.INTEGER,
        },
        HFIN: {
            type: DataTypes.INTEGER,
          },
          VEHIC: {
            type: DataTypes.INTEGER,
          },
          HVEHIC: {
            type: DataTypes.INTEGER,
          },
          BUSVEH: {
            type: DataTypes.INTEGER,
          },
          NBUSVEH: {
            type: DataTypes.INTEGER,
          },
          OWN: {
            type: DataTypes.INTEGER,
          },
          NOWN: {
            type: DataTypes.INTEGER,
          },
          LEASE: {
            type: DataTypes.INTEGER,
          },
          NLEASE: {
            type: DataTypes.INTEGER,
          },
          VLEASE: {
            type: DataTypes.INTEGER,
          },
          NVEHIC: {
            type: DataTypes.INTEGER,
          },
          NEWCAR1: {
            type: DataTypes.INTEGER,
          },
          NEWCAR2: {
            type: DataTypes.INTEGER,
          },
          FARMBUS: {
            type: DataTypes.INTEGER,
          },
          HOUSES: {
            type: DataTypes.INTEGER,
          },
          HHOUSES: {
            type: DataTypes.INTEGER,
          },
          HOUSECL: {
            type: DataTypes.INTEGER,
          },
          ORESRE: {
            type: DataTypes.INTEGER,
          },
          HORESRE: {
            type: DataTypes.INTEGER,
          },
          NNRESRE: {
            type: DataTypes.INTEGER,
          },
          HNNRESRE: {
            type: DataTypes.INTEGER,
          },
          BUS: {
            type: DataTypes.INTEGER,
          },
          ACTBUS: {
            type: DataTypes.INTEGER,
          },
          NONACTBUS: {
            type: DataTypes.INTEGER,
          },
          HBUS: {
            type: DataTypes.INTEGER,
          },
          OTHNFIN: {
            type: DataTypes.INTEGER,
          },
          HOTHNFIN: {
            type: DataTypes.INTEGER,
          },
          NFIN: {
            type: DataTypes.INTEGER,
          },
          HNFIN: {
            type: DataTypes.INTEGER,
          },
          NHNFIN: {
            type: DataTypes.INTEGER,
          },
          ASSET: {
            type: DataTypes.INTEGER,
          },
          HASSET: {
            type: DataTypes.INTEGER,
          },
          HELOC: {
            type: DataTypes.INTEGER,
          },
          MRTHEL: {
            type: DataTypes.INTEGER,
          },
          NH_MORT: {
            type: DataTypes.INTEGER,
          },
          HOMEEQ: {
            type: DataTypes.INTEGER,
          },
          HMRTHEL: {
            type: DataTypes.INTEGER,
          },
          HHELOC: {
            type: DataTypes.INTEGER,
          },
          HNH_MORT: {
            type: DataTypes.INTEGER,
          },
          HPRIM_MORT: {
            type: DataTypes.INTEGER,
          },
          PURCH1: {
            type: DataTypes.INTEGER,
          },
          REFIN_EVER: {
            type: DataTypes.INTEGER,
          },
          HEXTRACT_EVER: {
            type: DataTypes.INTEGER,
          },
          HSEC_MORT: {
            type: DataTypes.INTEGER,
          },
          PURCH2: {
            type: DataTypes.INTEGER,
          },
          HMORT2: {
            type: DataTypes.INTEGER,
          },
          HELOC_YN: {
            type: DataTypes.INTEGER,
          },
          OTHLOC: {
            type: DataTypes.INTEGER,
          },
          HOTHLOC: {
            type: DataTypes.INTEGER,
          },
          MORT1: {
            type: DataTypes.INTEGER,
          },
          MORT2: {
            type: DataTypes.INTEGER,
          },
          MORT3: {
            type: DataTypes.INTEGER,
          },
          RESDBT: {
            type: DataTypes.INTEGER,
          },
          HRESDBT: {
            type: DataTypes.INTEGER,
          },
          CCBAL: {
            type: DataTypes.INTEGER,
          },
          NOCCBAL: {
            type: DataTypes.INTEGER,
          },
          HCCBAL: {
            type: DataTypes.INTEGER,
          },
          VEH_INST: {
            type: DataTypes.INTEGER,
          },
          EDN_INST: {
            type: DataTypes.INTEGER,
          },
          INSTALL: {
            type: DataTypes.INTEGER,
          },
          OTH_INST: {
            type: DataTypes.INTEGER,
          },
          HVEH_INST: {
            type: DataTypes.INTEGER,
          },
          HEDN_INST: {
            type: DataTypes.INTEGER,
          },
          HOTH_INST: {
            type: DataTypes.INTEGER,
          },
          HINSTALL: {
            type: DataTypes.INTEGER,
          },
          ODEBT: {
            type: DataTypes.INTEGER,
          },
          HODEBT: {
            type: DataTypes.INTEGER,
          },
          DEBT: {
            type: DataTypes.INTEGER,
          },
          HDEBT: {
            type: DataTypes.INTEGER,
          },
          NETWORTH: {
            type: DataTypes.INTEGER,
          },
          LEVRATIO: {
            type: DataTypes.INTEGER,
          },
          DEBT2INC: {
            type: DataTypes.INTEGER,
          },
          KGHOUSE: {
            type: DataTypes.INTEGER,
          },
          KGORE: {
            type: DataTypes.INTEGER,
          },
          KGBUS: {
            type: DataTypes.INTEGER,
          },
          FARMBUS_KG: {
            type: DataTypes.INTEGER,
          },
          KGSTMF: {
            type: DataTypes.INTEGER,
          },
          KGTOTAL: {
            type: DataTypes.INTEGER,
          },
          PAYMORT1: {
            type: DataTypes.INTEGER,
          },
          PAYMORT2: {
            type: DataTypes.INTEGER,
          },
          PAYMORT3: {
            type: DataTypes.INTEGER,
          },
          PAYMORTO: {
            type: DataTypes.INTEGER,
          },
          PAYLOC1: {
            type: DataTypes.INTEGER,
          },
          PAYLOC2: {
            type: DataTypes.INTEGER,
          },
          PAYLOC3: {
            type: DataTypes.INTEGER,
          },
          PAYLOCO: {
            type: DataTypes.INTEGER,
          },
          PAYHI1: {
            type: DataTypes.INTEGER,
          },
          PAYHI2: {
            type: DataTypes.INTEGER,
          },
          PAYLC1: {
            type: DataTypes.INTEGER,
          },
          PAYLC2: {
            type: DataTypes.INTEGER,
          },
          PAYLCO: {
            type: DataTypes.INTEGER,
          },
          PAYORE1: {
            type: DataTypes.INTEGER,
          },
          PAYORE2: {
            type: DataTypes.INTEGER,
          },
          PAYOREV: {
            type: DataTypes.INTEGER,
          },
          PAYORE3: {
            type: DataTypes.INTEGER,
          },
          PAYVEH1: {
            type: DataTypes.INTEGER,
          },
          PAYVEH2: {
            type: DataTypes.INTEGER,
          },
          PAYVEH3: {
            type: DataTypes.INTEGER,
          },
          PAYVEH4: {
            type: DataTypes.INTEGER,
          },
          PAYVEHM: {
            type: DataTypes.INTEGER,
          },
          PAYVEO1: {
            type: DataTypes.INTEGER,
          },
          PAYVEO2: {
            type: DataTypes.INTEGER,
          },
          PAYVEOM: {
            type: DataTypes.INTEGER,
          },
          PAYEDU1: {
            type: DataTypes.INTEGER,
          },
          PAYEDU2: {
            type: DataTypes.INTEGER,
          },
          PAYEDU3: {
            type: DataTypes.INTEGER,
          },
          PAYEDU4: {
            type: DataTypes.INTEGER,
          },
          PAYEDU5: {
            type: DataTypes.INTEGER,
          },
          PAYEDU6: {
            type: DataTypes.INTEGER,
          },
          PAYEDU7: {
            type: DataTypes.INTEGER,
          },
          PAYILN1: {
            type: DataTypes.INTEGER,
          },
          PAYILN2: {
            type: DataTypes.INTEGER,
          },
          PAYILN3: {
            type: DataTypes.INTEGER,
          },
          PAYILN4: {
            type: DataTypes.INTEGER,
          },
          PAYILN5: {
            type: DataTypes.INTEGER,
          },
          PAYILN6: {
            type: DataTypes.INTEGER,
          },
          PAYILN7: {
            type: DataTypes.INTEGER,
          },
          PAYMARG: {
            type: DataTypes.INTEGER,
          },
          PAYINS: {
            type: DataTypes.INTEGER,
          },
          PAYPEN1: {
            type: DataTypes.INTEGER,
          },
          PAYPEN2: {
            type: DataTypes.INTEGER,
          },
          PAYPEN3: {
            type: DataTypes.INTEGER,
          },
          PAYPEN4: {
            type: DataTypes.INTEGER,
          },
          PAYPEN5: {
            type: DataTypes.INTEGER,
          },
          PAYPEN6: {
            type: DataTypes.INTEGER,
          },
          TPAY: {
            type: DataTypes.INTEGER,
          },
          MORTPAY: {
            type: DataTypes.INTEGER,
          },
          CONSPAY: {
            type: DataTypes.INTEGER,
          },
          REVPAY: {
            type: DataTypes.INTEGER,
          },
          PIRTOTAL: {
            type: DataTypes.INTEGER,
          },
          PIRMORT: {
            type: DataTypes.INTEGER,
          },
          PIRCONS: {
            type: DataTypes.INTEGER,
          },
          PIRREV: {
            type: DataTypes.INTEGER,
          },
          PIR40: {
            type: DataTypes.INTEGER,
          },
          PLOAN1: {
            type: DataTypes.INTEGER,
          },
          PLOAN2: {
            type: DataTypes.INTEGER,
          },
          PLOAN3: {
            type: DataTypes.INTEGER,
          },
          PLOAN4: {
            type: DataTypes.INTEGER,
          },
          PLOAN5: {
            type: DataTypes.INTEGER,
          },
          PLOAN6: {
            type: DataTypes.INTEGER,
          },
          PLOAN7: {
            type: DataTypes.INTEGER,
          },
          PLOAN8: {
            type: DataTypes.INTEGER,
          },
          LLOAN1: {
            type: DataTypes.INTEGER,
          },
          LLOAN2: {
            type: DataTypes.INTEGER,
          },
          LLOAN3: {
            type: DataTypes.INTEGER,
          },
          LLOAN4: {
            type: DataTypes.INTEGER,
          },
          LLOAN5: {
            type: DataTypes.INTEGER,
          },
          LLOAN6: {
            type: DataTypes.INTEGER,
          },
          LLOAN7: {
            type: DataTypes.INTEGER,
          },
          LLOAN8: {
            type: DataTypes.INTEGER,
          },
          LLOAN9: {
            type: DataTypes.INTEGER,
          },
          LLOAN10: {
            type: DataTypes.INTEGER,
          },
          LLOAN11: {
            type: DataTypes.INTEGER,
          },
          LLOAN12: {
            type: DataTypes.INTEGER,
          },
          NWCAT: {
            type: DataTypes.INTEGER,
          },
          INCCAT: {
            type: DataTypes.INTEGER,
          },
          ASSETCAT: {
            type: DataTypes.INTEGER,
          },
          NINCCAT: {
            type: DataTypes.INTEGER,
          },
          NINC2CAT: {
            type: DataTypes.INTEGER,
          },
          NWPCTLECAT: {
            type: DataTypes.INTEGER,
          },
          INCPCTLECAT: {
            type: DataTypes.INTEGER,
          },
          NINCPCTLECAT: {
            type: DataTypes.INTEGER,
          },
          INCQRTCAT: {
            type: DataTypes.INTEGER,
          },
          NINCQRTCAT: {
            type: DataTypes.INTEGER,
          },
    },{
        tableName: 'scfp2019',
            timestamps: false, // Set timestamps to false to disable createdAt and updatedAt columns
          });

      return scfp2019
}